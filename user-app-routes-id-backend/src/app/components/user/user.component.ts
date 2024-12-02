import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  title : string  = "Listado de ususarios";
  
  users : User[] = [];

  constructor(private router: Router, private service : UserService, 
    private sharingData : SharingDataService){ 
      if(this.router.getCurrentNavigation()?.extras.state){
        this.users = this.router.getCurrentNavigation()?.extras.state!["users"];
      }
  }

  ngOnInit(): void {
    if(this.users == undefined || this.users == null ||  this.users.length == 0){
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  onSelectedUser(user : User) : void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onRemoveUser(id : number) : void {
    this.sharingData.idUserEventEmitter.emit(id);
  }
}