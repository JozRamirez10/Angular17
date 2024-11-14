import { Component, OnInit} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.action';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
  
  items : CartItem[] = [];
  total : number = 0;

  constructor(private store : Store<{items: ItemsState}>, private sharinDataService: SharingDataService) {
    this.store.select('items').subscribe(state => {
      this.items = state.items,
      this.total = state.total;
    })
  }
  ngOnInit(): void {
    this.store.dispatch(total());  
  }
  
  onDeleteCart(id : number){
    this.sharinDataService.idProductEventEmitter.emit(id);
  }
}