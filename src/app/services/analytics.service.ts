import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isInitialized = false;
  private readonly GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Substitua pelo seu ID real

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnalytics();
      this.trackRouteChanges();
    }
  }

  private initializeAnalytics(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Carrega script do Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Inicializa o dataLayer e gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.GA_MEASUREMENT_ID, {
      // Configurações de privacidade
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    this.isInitialized = true;
  }

  private trackRouteChanges(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  // Tracking de page views
  trackPageView(url: string, title: string = ''): void {
    if (!isPlatformBrowser(this.platformId) || !this.isInitialized) return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title
      });
    }
  }

  // Tracking de eventos customizados
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.isInitialized) return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Tracking específico para e-commerce
  trackProduct(productId: string, productName: string, category: string, price: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.isInitialized) return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'BRL',
        value: price,
        items: [{
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
          quantity: 1
        }]
      });
    }
  }

  // Tracking de adição ao carrinho
  trackAddToCart(productId: string, productName: string, category: string, price: number, quantity: number = 1): void {
    if (!isPlatformBrowser(this.platformId) || !this.isInitialized) return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'BRL',
        value: price * quantity,
        items: [{
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
          quantity: quantity
        }]
      });
    }
  }

  // Tracking de conversão/compra
  trackConversion(transactionId: string, value: number, items: any[]): void {
    if (!isPlatformBrowser(this.platformId) || !this.isInitialized) return;
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'BRL',
        items: items
      });
    }
  }

  // Tracking de formulários
  trackFormSubmission(formName: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.trackEvent('form_submit', 'engagement', formName);
  }

  // Tracking de cliques em links externos
  trackExternalLink(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.trackEvent('click', 'external_link', url);
  }

  // Tracking de downloads
  trackDownload(fileName: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.trackEvent('download', 'file', fileName);
  }
}