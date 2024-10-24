import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit{

  items : CartItem[] = [];

  total : number = 0;

  constructor(
    private router : Router,
    private sharingDataService : SharingDataService ,
    private service : ProductService){}
  
  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
      // Cuando se inicia el navegador, ve si en la sesión ya existe un carro de compras
      // si no, crea el arreglo vacío
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() : void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
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
      this.router.navigate(["/cart"], // Redirige a una página
        { state: {items: this.items, total: this.total}
      });
      
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

          this.items = this.items.filter(item => item.product.id !== id);
          if(this.items.length == 0){
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();

          // Primero navega a la ruta base y luego al carro de compras
          // Da la sensación de que el carro de compras se recarga en tiempo real
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(["/cart"], // Redirige a una página
              { state: {items: this.items, total: this.total}
            });
          });

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el producto del carro de compras",
            icon: "success"
          });
        }
      });

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
