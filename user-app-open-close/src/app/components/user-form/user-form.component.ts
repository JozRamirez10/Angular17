import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  
  @Input() user : User;

  @Output() newUserEventEmitter : EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user = new User();
  }

  onSubmit(userForm : NgForm) : void {
    if(userForm.valid){
      this.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm : NgForm) : void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
