import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { Product } from '../../models/product.model'
import { ProductService } from '../../product.service'
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component'

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, ProductCardComponent, ContactModalComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = 'all';
  isModalOpen = false;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products
      this.filteredProducts = products
    })
  }

  filterProducts(category: string) {
    this.selectedCategory = category

    if (category === 'all') {
      this.filteredProducts = this.allProducts
    } else {
      this.filteredProducts = this.allProducts.filter(product => product.category === category)
    }
  }

  getProductCount(category: string): number {
    return this.allProducts.filter(product => product.category === category).length
  }

  openModal(product: Product) {
    this.selectedProduct = product
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
    this.selectedProduct = null
  }
}
