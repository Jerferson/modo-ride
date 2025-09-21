import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  jsonLD?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultSEO: SEOData = {
    title: 'Modo Ride - Patinetes e Bicicletas Elétricas | Mobilidade Urbana Sustentável',
    description: 'Descubra a nova era da mobilidade urbana com patinetes elétricos, bicicletas elétricas e acessórios de alta qualidade. Modo Ride oferece soluções sustentáveis e inovadoras para seu transporte.',
    keywords: 'patinete elétrico, bicicleta elétrica, scooter, mobilidade urbana, transporte sustentável, e-bike, patins elétrico, acessórios mobilidade',
    robots: 'index, follow',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  };

  private pagesSEO: { [key: string]: Partial<SEOData> } = {
    '/': {
      title: 'Modo Ride - Patinetes e Bicicletas Elétricas | Mobilidade Urbana Sustentável',
      description: 'Revolucione sua mobilidade urbana com patinetes elétricos, bicicletas elétricas e acessórios premium. Qualidade, segurança e sustentabilidade em primeiro lugar.',
      keywords: 'patinete elétrico, scooter elétrico, bicicleta elétrica, e-bike, mobilidade urbana, transporte sustentável, modo ride',
      jsonLD: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Modo Ride",
        "url": "https://www.modoride.com.br",
        "logo": "https://www.modoride.com.br/assets/logo.png",
        "description": "Empresa especializada em mobilidade urbana sustentável com patinetes e bicicletas elétricas",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR"
        },
        "sameAs": [
          "https://www.instagram.com/modoride",
          "https://www.facebook.com/modoride"
        ]
      }
    },
    '/patinetes-eletricos': {
      title: 'Patinetes Elétricos Premium | Scooters de Alta Performance - Modo Ride',
      description: 'Patinetes elétricos de última geração com autonomia superior, design moderno e máxima segurança. Descubra nossa linha completa de scooters elétricos.',
      keywords: 'patinete elétrico, scooter elétrico, patins elétrico, mobilidade urbana, transporte pessoal, scooter premium'
    },
    '/bicicletas-eletricas': {
      title: 'Bicicletas Elétricas | E-bikes Inovadoras para Cidade - Modo Ride',
      description: 'E-bikes modernas com tecnologia avançada, bateria de longa duração e design ergonômico. Pedale com facilidade pela cidade.',
      keywords: 'bicicleta elétrica, e-bike, bike elétrica, bicicleta urbana, mobilidade sustentável, ciclismo elétrico'
    },
    '/bicicletas': {
      title: 'Bicicletas Convencionais | Bikes de Qualidade Superior - Modo Ride',
      description: 'Bicicletas convencionais com design moderno, materiais de qualidade e preços acessíveis. Perfeitas para cidade e lazer.',
      keywords: 'bicicleta, bike, bicicleta urbana, ciclismo, transporte sustentável, bicicleta cidade'
    },
    '/acessorios': {
      title: 'Acessórios para Mobilidade | Capacetes e Peças - Modo Ride',
      description: 'Capacetes, luvas, peças de reposição e acessórios essenciais para sua segurança e conforto na mobilidade urbana.',
      keywords: 'capacete patinete, acessórios bike, peças patinete elétrico, segurança mobilidade, capacete bicicleta'
    },
    '/sobre-nos': {
      title: 'Sobre a Modo Ride | Nossa Missão na Mobilidade Urbana Sustentável',
      description: 'Conheça a história da Modo Ride, nossa missão de transformar a mobilidade urbana e nosso compromisso com a sustentabilidade.',
      keywords: 'modo ride empresa, mobilidade urbana, sustentabilidade, sobre empresa, missão visão'
    }
  };

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Monitorar mudanças de rota para atualizar SEO
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSEOForRoute(event.url);
      });
  }

  updateSEO(seoData: Partial<SEOData>): void {
    const fullSEOData = { ...this.defaultSEO, ...seoData };

    // Atualizar título
    this.title.setTitle(fullSEOData.title);

    // Atualizar meta tags básicas
    this.updateMetaTag('description', fullSEOData.description);
    this.updateMetaTag('keywords', fullSEOData.keywords || '');
    this.updateMetaTag('robots', fullSEOData.robots || 'index, follow');

    // Open Graph tags
    this.updateMetaTag('og:title', fullSEOData.ogTitle || fullSEOData.title, 'property');
    this.updateMetaTag('og:description', fullSEOData.ogDescription || fullSEOData.description, 'property');
    this.updateMetaTag('og:type', fullSEOData.ogType || 'website', 'property');
    
    if (fullSEOData.ogImage) {
      this.updateMetaTag('og:image', fullSEOData.ogImage, 'property');
    }

    // Twitter Card tags
    this.updateMetaTag('twitter:card', fullSEOData.twitterCard || 'summary_large_image');
    this.updateMetaTag('twitter:title', fullSEOData.ogTitle || fullSEOData.title);
    this.updateMetaTag('twitter:description', fullSEOData.ogDescription || fullSEOData.description);

    // Canonical URL
    if (fullSEOData.canonical) {
      this.updateCanonical(fullSEOData.canonical);
    }

    // JSON-LD
    if (fullSEOData.jsonLD) {
      this.updateJsonLD(fullSEOData.jsonLD);
    }
  }

  private updateSEOForRoute(url: string): void {
    const seoData = this.pagesSEO[url] || {};
    this.updateSEO(seoData);

    // Atualizar canonical para a URL atual
    if (isPlatformBrowser(this.platformId)) {
      const canonical = `https://www.modoride.com.br${url}`;
      this.updateCanonical(canonical);
      this.updateMetaTag('og:url', canonical, 'property');
    }
  }

  private updateMetaTag(name: string, content: string, attr: string = 'name'): void {
    if (content) {
      if (this.meta.getTag(`${attr}="${name}"`)) {
        this.meta.updateTag({ [attr]: name, content });
      } else {
        this.meta.addTag({ [attr]: name, content });
      }
    }
  }

  private updateCanonical(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  private updateJsonLD(jsonLD: any): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remover script JSON-LD existente
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Adicionar novo script JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLD);
      document.head.appendChild(script);
    }
  }

  // Método para adicionar SEO de produto específico
  updateProductSEO(product: any): void {
    const productSEO: SEOData = {
      title: `${product.name} | ${product.category} - Modo Ride`,
      description: `${product.description} Compre com segurança na Modo Ride. Entrega rápida e qualidade garantida.`,
      keywords: `${product.name}, ${product.category}, ${product.keywords || ''}`,
      ogTitle: product.name,
      ogDescription: product.description,
      ogImage: product.image,
      ogType: 'product',
      jsonLD: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "brand": {
          "@type": "Brand",
          "name": "Modo Ride"
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Modo Ride"
          }
        }
      }
    };

    this.updateSEO(productSEO);
  }

  // Método para gerar breadcrumbs
  generateBreadcrumbs(path: string): any {
    const pathSegments = path.split('/').filter(segment => segment);
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.modoride.com.br"
        }
      ]
    };

    pathSegments.forEach((segment, index) => {
      const position = index + 2;
      const name = this.getPageNameFromSegment(segment);
      const url = `https://www.modoride.com.br/${pathSegments.slice(0, index + 1).join('/')}`;
      
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": position,
        "name": name,
        "item": url
      });
    });

    return breadcrumbs;
  }

  private getPageNameFromSegment(segment: string): string {
    const names: { [key: string]: string } = {
      'patinetes-eletricos': 'Patinetes Elétricos',
      'bicicletas-eletricas': 'Bicicletas Elétricas', 
      'bicicletas': 'Bicicletas',
      'acessorios': 'Acessórios',
      'sobre-nos': 'Sobre Nós'
    };

    return names[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  }
}