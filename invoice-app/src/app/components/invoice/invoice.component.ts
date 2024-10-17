import { Component } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { ListItemsComponent } from '../list-items/list-items.component';
import { TotalComponent } from '../total/total.component';
import { FormItemComponent } from '../form-item/form-item.component';
import { Item } from '../../models/item';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [InvoiceViewComponent, ClientViewComponent, 
    CompanyViewComponent, ListItemsComponent, TotalComponent,
    FormItemComponent],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent {
  
  invoice! : Invoice;
  
  // Definido como inyección
  constructor(private service: InvoiceService){}

  // Método constructor
  ngOnInit(): void {
    this.invoice = this.service.getInvoice();
  }

  removeItem(id : number){
    this.invoice = this.service.remove(id);
  }

  addItem(item : Item){
    this.invoice = this.service.save(item);
  }
}
