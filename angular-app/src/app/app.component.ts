import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
  }
  // Public - Accesible desde la vista
  // Private - Solo accesible por la clase
  public title : string = 'Hola Mundo Angular 17';

  subTitle : string = 'Contador con estado de sesión';

  users : string[] = ['Pepe', 'Maria', 'Juan', 'Andres'];
  
  variableVacia? : string; // Así se declara una variable sin inicializar

  visible : boolean = false;

  setVisible(): void {
    this.visible = !this.visible;
  }

  counter : number = 0;

  setCounter(counter : number) : void {
    this.counter = counter;
  }

}
