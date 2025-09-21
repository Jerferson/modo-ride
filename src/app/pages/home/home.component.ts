import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component'
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { Product } from '../../models/product.model'
import { ProductService } from '../../product.service'

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductCardComponent, ContactModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  featuredProducts: Product[] = [];
  isModalOpen = false;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products
    })
  }

  openModal(product: Product) {
    this.selectedProduct = product
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    this.selectedProduct = null
  }

  scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

}
