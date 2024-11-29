import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{
  
  users : User[] = [];

  constructor(
    private service: UserService, private sharingData : SharingDataService,
    private router: Router){ }
  
  ngOnInit(): void {
   this.service.findAll().subscribe( users => this.users = users);
   this.addUser();
   this.removeUser();
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0){
        this.users = this.users.map( u => (u.id == user.id) ? {... user} : u );
      }else{
        this.users = [... this.users, {... user, id: new Date().getTime() }]
      }
      this.router.navigate(['/users'], {state : {users: this.users}});
      Swal.fire({
        title: "Guardado",
        text: "¡Usuario guardado con éxito!",
        icon: "success"
      });
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
          this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() =>{
            this.router.navigate(['/users'], {state : {users: this.users}});
          });
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
