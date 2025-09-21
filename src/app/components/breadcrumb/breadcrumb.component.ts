import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb-nav" aria-label="Navegação estrutural" 
         itemscope itemtype="https://schema.org/BreadcrumbList">
      <ol class="breadcrumb-list">
        <li *ngFor="let item of breadcrumbs; let i = index" 
            class="breadcrumb-item"
            [class.active]="item.isActive"
            itemprop="itemListElement" 
            itemscope 
            itemtype="https://schema.org/ListItem">
          
          <a *ngIf="!item.isActive" 
             [routerLink]="item.url" 
             itemprop="item"
             class="breadcrumb-link">
            <span itemprop="name">{{ item.label }}</span>
          </a>
          
          <span *ngIf="item.isActive" 
                itemprop="name" 
                class="breadcrumb-current"
                aria-current="page">
            {{ item.label }}
          </span>
          
          <meta itemprop="position" [content]="i + 1">
          
          <span *ngIf="i < breadcrumbs.length - 1" 
                class="breadcrumb-separator" 
                aria-hidden="true">
            >
          </span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      margin-bottom: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e9ecef;
    }

    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.5rem;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .breadcrumb-link {
      color: #007bff;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }

    .breadcrumb-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }

    .breadcrumb-current {
      color: #6c757d;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .breadcrumb-separator {
      color: #6c757d;
      font-size: 0.9rem;
      user-select: none;
    }

    .breadcrumb-item.active {
      color: #6c757d;
    }

    @media (max-width: 768px) {
      .breadcrumb-nav {
        padding: 0.5rem 0;
      }
      
      .breadcrumb-link,
      .breadcrumb-current {
        font-size: 0.8rem;
      }
      
      .breadcrumb-list {
        gap: 0.25rem;
      }
      
      .breadcrumb-item {
        gap: 0.25rem;
      }
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: BreadcrumbItem[] = [];
  @Input() autoGenerate: boolean = true;

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    if (this.autoGenerate && this.breadcrumbs.length === 0) {
      this.generateBreadcrumbs();
    }
    
    // Adicionar JSON-LD para breadcrumbs
    this.addBreadcrumbStructuredData();
  }

  private generateBreadcrumbs(): void {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);

    this.breadcrumbs = [
      { label: 'Home', url: '/', isActive: false }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      this.breadcrumbs.push({
        label: this.getSegmentLabel(segment),
        url: currentPath,
        isActive: isLast
      });
    });
  }

  private getSegmentLabel(segment: string): string {
    const labels: { [key: string]: string } = {
      'patinetes-eletricos': 'Patinetes Elétricos',
      'bicicletas-eletricas': 'Bicicletas Elétricas',
      'bicicletas': 'Bicicletas',
      'acessorios': 'Acessórios',
      'sobre-nos': 'Sobre Nós'
    };

    return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  }

  private addBreadcrumbStructuredData(): void {
    const breadcrumbLD = this.seoService.generateBreadcrumbs(window.location.pathname);
    
    // Adicionar script JSON-LD para breadcrumbs
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbLD);
    document.head.appendChild(script);
  }
}