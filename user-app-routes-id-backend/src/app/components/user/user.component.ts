import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

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

  constructor(private router: Router, private service : UserService, 
    private sharingData : SharingDataService, private route : ActivatedRoute){ 
      if(this.router.getCurrentNavigation()?.extras.state){
        this.users = this.router.getCurrentNavigation()?.extras.state!["users"];
      }
  }

  ngOnInit(): void {
    if(this.users == undefined || this.users == null ||  this.users.length == 0){
      //this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
        const page = + (params.get('page') || '0')
        this.service.findAllPageable(page).subscribe( pageable =>{
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharingData.pageUsersEventEmitter.emit({users: this.users, paginator: this.paginator});
        }); 
      });
    }
  }

  onSelectedUser(user : User) : void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onRemoveUser(id : number) : void {
    this.sharingData.idUserEventEmitter.emit(id);
  }
}
