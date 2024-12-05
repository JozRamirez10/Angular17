import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../../store/users.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  title : string  = "Listado de ususarios";
  
  users : User[] = [];

  paginator : any = {};

  constructor(
    private router: Router, 
    private service : UserService, 
    private sharingData : SharingDataService, 
    private route : ActivatedRoute,
    private authService: AuthService,
    private store: Store<{users: any }>){ 
      this.store.select('users').subscribe(state => {
        this.users = state.users;
        this.paginator = state.paginator;
      });
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => this.store.dispatch(load({page:  + (params.get('page') || '0') })));
  }

  onSelectedUser(user : User) : void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onRemoveUser(id : number) : void {
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
          this.store.dispatch(remove({id}));
      }
    });
  }

  get admin(){
    return this.authService.isAdmin();
  }
  
}
