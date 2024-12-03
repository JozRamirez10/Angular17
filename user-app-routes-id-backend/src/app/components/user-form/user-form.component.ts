import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{
  
  user : User;
  errors : any = [];

  constructor(private route: ActivatedRoute, 
    private sharingData : SharingDataService,
    private service : UserService){
    this.user = new User();
  }
  ngOnInit(): void {

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);

    this.route.paramMap.subscribe(params => {
      const id : number = + (params.get('id') || '0');
      if(id > 0){
        this.sharingData.findUserByIdEmitter.emit(id);
        //this.service.findById(id).subscribe(user => this.user = user);
      }
    })
  }

  onSubmit(userForm : NgForm) : void {
    // if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user);
    // }
    // userForm.reset();
    // userForm.resetForm();
  }

  onClear(userForm : NgForm) : void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
