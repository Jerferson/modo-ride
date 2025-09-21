import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product
  @Output() notifyClick = new EventEmitter<Product>();

  onNotifyClick() {
    this.notifyClick.emit(this.product)
  }

}
