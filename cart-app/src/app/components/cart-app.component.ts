import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{
  
  products : Product[] = [];

  items : CartItem[] = [];

  total : number = 0;

  constructor(private SharingDataService : SharingDataService ,private service : ProductService){}
  
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
      // Cuando se inicia el navegador, ve si en la sesión ya existe un carro de compras
      // si no, crea el arreglo vacío
    this.calculateTotal();
    this.onDeleteCart();
  }

  onAddCart() : void {
    const hasItems = this.items.find(item => item.product.id === product.id)
    if(hasItems){
      this.items = this.items.map(item => {
        if(item.product.id === product.id){
          return {
            ... item,
            quantity : item.quantity + 1
          }
        }
        return item;
      })
    }else{
      this.items = [... this.items, {product : {... product}, quantity: 1}];
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart() : void {
    this.SharingDataService.idProductEventEmitter.subscribe(id =>{
      this.items = this.items.filter(item => item.product.id !== id);
      if(this.items.length == 0){
        sessionStorage.removeItem('cart');
      }
      this.calculateTotal();
      this.saveSession();
    });
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
