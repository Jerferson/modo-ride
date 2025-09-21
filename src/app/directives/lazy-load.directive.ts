import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements AfterViewInit {
  @Input() appLazyLoad: string = '';
  @Input() lazyLoadPlaceholder: string = 'data:image/svg+xml,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%25" height="100%25" fill="%23ddd"/%3E%3C/svg%3E';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Set placeholder initially
    if (this.el.nativeElement.tagName === 'IMG') {
      this.el.nativeElement.src = this.lazyLoadPlaceholder;
      this.el.nativeElement.classList.add('lazy-loading');
    }

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    
    if (img.tagName === 'IMG' && this.appLazyLoad) {
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = this.appLazyLoad;
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        // Trigger fade-in effect
        setTimeout(() => {
          img.style.opacity = '1';
        }, 10);
      };
      
      tempImg.onerror = () => {
        img.classList.add('lazy-error');
        console.warn(`Falha ao carregar imagem: ${this.appLazyLoad}`);
      };
      
      tempImg.src = this.appLazyLoad;
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}