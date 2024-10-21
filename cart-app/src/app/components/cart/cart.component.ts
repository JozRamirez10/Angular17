import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges{
  
  @Input() items : CartItem[] = [];
  @Input() total : number = 0;
  
  @Output() idProductEventEmitter = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
    // let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }
  onDeleteCart(id : number){
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal() : void {
    this.total = this.items.reduce( (accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  // Guarda el carro en la sesión del navegador
  saveSession() : void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
                                // Construye un json de los elementos que se quieren guardar
                                // en la sesión
  }

}
