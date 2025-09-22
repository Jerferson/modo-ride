import { CommonModule } from '@angular/common'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router'
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component'
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { Product } from '../../models/product.model'
import { ProductService } from '../../product.service'
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductCardComponent, ContactModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  isModalOpen = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private seoService: SeoService,
    private analytics: AnalyticsService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    // Configurar SEO para homepage
    this.setupHomeSEO();

    // Carregar produtos em destaque
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products
    });

    // Tracking de visualização da página
    this.trackPageView();
  }

  ngOnDestroy() {
    // Cleanup se necessário
  }

  private setupHomeSEO(): void {
    const seoData = {
      title: 'Modo Ride - Patinetes e Bicicletas Elétricas | Mobilidade Urbana Sustentável',
      description: 'Revolucione sua mobilidade urbana com patinetes elétricos, bicicletas elétricas e acessórios premium. Qualidade, segurança e sustentabilidade em primeiro lugar.',
      keywords: 'patinete elétrico, scooter elétrico, bicicleta elétrica, e-bike, mobilidade urbana, transporte sustentável, modo ride',
      canonical: 'https://www.modoride.com.br/',
      ogTitle: 'Modo Ride - Mobilidade Urbana Elétrica Premium',
      ogDescription: 'Descubra nossa linha premium de patinetes e bicicletas elétricas. Design inovador e tecnologia avançada.',
      ogImage: 'https://www.modoride.com.br/assets/og-home.jpg',
      jsonLD: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Modo Ride",
        "url": "https://www.modoride.com.br",
        "logo": "https://www.modoride.com.br/assets/logo.png",
        "description": "Empresa especializada em mobilidade urbana sustentável com patinetes e bicicletas elétricas de alta qualidade",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-41-99536-8623",
          "contactType": "customer service",
          "availableLanguage": "Portuguese"
        },
        "sameAs": [
          "https://www.instagram.com/modoride",
          "https://www.facebook.com/modoride",
          "https://wa.me/5541995368623"
        ]
      }
    };

    this.seoService.updateSEO(seoData);
  }

  private trackPageView(): void {
    // Use the AnalyticsService instead of direct gtag calls
    this.analytics.trackPageView('/', 'Home - Modo Ride');
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
