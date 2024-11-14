import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items : CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private router : Router,
    private sharingDataService : SharingDataService) {
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.saveSession();
      });
    }
  
  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() : void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      
      this.store.dispatch(add({product}));
      this.store.dispatch(total());

      this.router.navigate(["/cart"]);
      
      Swal.fire({
        title: "Shopping Cart",
        text: "Nuevo producto agregado al carro de compras!",
        icon: "success"
      });
      
    })
  }

  onDeleteCart() : void {
    this.sharingDataService.idProductEventEmitter.subscribe(id =>{

      Swal.fire({
        title: "¿Estás seguro de que deseas eliminar?",
        text: "El producto se eliminará del carro de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());

          this.router.navigate(["/cart"]);
          
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto del carro de compras",
            icon: "success"
          });
        }
      });

    });
  }

  // Guarda el carro en la sesión del navegador
  saveSession() : void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
                                // Construye un json de los elementos que se quieren guardar
                                // en la sesión
  }
}
