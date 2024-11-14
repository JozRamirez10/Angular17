import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  // Cuando se utiliza para el método get, se nombra con _
  private _idProductEventEmitter : EventEmitter<number>= new EventEmitter();

  private _productEventEmitter : EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get productEventEmitter() : EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get idProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
