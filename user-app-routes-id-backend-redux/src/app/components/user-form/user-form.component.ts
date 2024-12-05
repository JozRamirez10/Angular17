import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../../store/users.action';

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
    private store : Store<{users:any}>){
    
    this.user = new User();
    
    this.store.select('users').subscribe(state =>{
      this.errors = state.errors;
      this.user = {... state.user};
    });
  }
  
  ngOnInit(): void {
    this.store.dispatch(resetUser());
    this.route.paramMap.subscribe(params => {
      const id : number = + (params.get('id') || '0');
      if(id > 0){
        this.store.dispatch(find({id}));
      }
    })
  }

  onSubmit(userForm : NgForm) : void {
    if(this.user.id != null){
      this.store.dispatch(update({userUpdate: this.user}));
    }else{
      this.store.dispatch(add({userNew: this.user}));
    }
  }

  onClear(userForm : NgForm) : void{
    this.store.dispatch(resetUser());
    userForm.reset();
    userForm.resetForm();
  }

}
