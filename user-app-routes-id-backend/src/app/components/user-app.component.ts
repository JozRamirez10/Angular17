import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{
  
  users : User[] = [];
  paginator : any = {};

  constructor(
    private service: UserService, 
    private sharingData : SharingDataService,
    private router: Router,
    private route : ActivatedRoute,
    private authService : AuthService){ }
  
  ngOnInit(): void {
    //   this.service.findAll().subscribe( users => this.users = users);
    //   this.route.paramMap.subscribe(params => {
    //     const page = + (params.get('page') || '0')
    //     this.service.findAllPageable(page).subscribe( pageable => this.users = pageable.content as User[]);
    //   });
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {
      this.authService.loginUser({username, password}).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);
          const user = {username : payload.sub};
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
        },
        error: error => {
          if(error.status == 401){
            Swal.fire('Error en el login', error.error.message, 'error');
          }else{
            throw error;
          }
        }
      });
    });
  }

  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }

  findUserById(){
    this.sharingData.findUserByIdEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0){
        this.service.update(user).subscribe(
        {
          next: (userUpdate) => {
            this.users = this.users.map( u => (u.id == userUpdate.id) ? {... userUpdate} : u );
            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
            Swal.fire({
              title: "Usuario actualizado",
              text: "¡Usuario editado con éxito!",
              icon: "success"
            });
          },
          error: (err) => {
            if(err.status == 400){
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        })
      }else{
        this.service.create(user).subscribe( {
          next: userNew => {
            this.users = [... this.users, {... userNew}]
            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
            Swal.fire({
              title: "Usuario creado",
              text: "¡Usuario creado con éxito!",
              icon: "success"
            });
          },
          error: (err) => {
            if(err.status == 400){
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        })
      }
    });
  }

  removeUser() : void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "¿Seguro que quieres eliminar al usuario?",
        text: "Los datos del usuario serán eliminados del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });
            });
          })
          Swal.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado",
            icon: "success"
          });
        }
      });
    });
  }
}
