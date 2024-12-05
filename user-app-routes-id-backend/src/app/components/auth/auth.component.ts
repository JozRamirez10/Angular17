import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user : User;

  constructor (private sharinData : SharingDataService){
    this.user = new User();
  }

  onSubmit() {
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validación',
        'Username y password requeridos',
        'error'
      )
    }else{
      this.sharinData.handlerLoginEventEmitter.emit({
        username: this.user.username,
        password: this.user.password
      });
    }
  }
}
