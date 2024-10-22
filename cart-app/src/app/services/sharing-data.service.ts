import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  // Cuando se utiliza para el método get, se nombra con _
  private _idProductEventEmitter : EventEmitter<number>= new EventEmitter();

  constructor() { }

  get idProductEventEmitter(){
    return this._idProductEventEmitter;
  }
}
