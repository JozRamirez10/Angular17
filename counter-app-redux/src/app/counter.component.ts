import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/items.actions';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  title : string = 'Counter usando Redux';
  counter : number = 0;

  // Store -> Redux
  constructor(private store: Store<{counter:number}>){
    //this.counter = 0;
    this.store.select('counter').subscribe(counter => {
      this.counter = counter; // Relaciona el counter de esta clase
                              // con el initialState de redux
    });
  }
  
  increment() : void {
    // this.counter++;
    this.store.dispatch(increment({add: 3})); // Llama la función de redux
                // Incrementa en 3
  }

  decrement() : void {
    // this.counter--;
    this.store.dispatch(decrement());
  }

  reset() : void {
    // this.counter = 0;
    this.store.dispatch(reset());
  }

}
