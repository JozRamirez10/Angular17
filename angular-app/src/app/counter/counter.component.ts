import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  
  // Inicializador al momento de cargar la página
  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
      // Si el valor no esta dentro de sessionStorage, asigna un cero
      // Se agrega ! para evitar que el compilador marque error
  }

  @Input() title! : string;
    // Input sirve para pasar información del padre al hijo, en este caso, counter recibe información de app

  @Output() counterEmit : EventEmitter<number> = new EventEmitter();
    // Output sirve para pasar informaicón del hijo al padre, en este caso, counter le pasa información a app

  counter : number = 0;
  setCounter() : void {
    this.counter++;
    sessionStorage.setItem('counter', this.counter.toString());
      // Persiste la información dentro de la sesión del navegador
    
    /*
      sessionStorage - Lo guarda en la sesión del navegador
      localStorage - Lo guarda en el equipo, es decir, la información persiste
        aunque se cierre el navegador
    */ 
   
    this.counterEmit.emit(this.counter); // Le pasa la informaicón del counter

  }
}
