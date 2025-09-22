import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  generateSitemap(): string {
    const baseUrl = 'https://www.modoride.com.br';
    const currentDate = new Date().toISOString().split('T')[0];

    const urls = [
      {
        loc: baseUrl,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0'
      },
      {
        loc: `${baseUrl}/patinetes-eletricos`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${baseUrl}/bicicletas-eletricas`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${baseUrl}/bicicletas`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${baseUrl}/acessorios`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        loc: `${baseUrl}/sobre-nos`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6'
      }
    ];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${url.loc}</loc>\n`;
      sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${url.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    return sitemap;
  }

  // Método para adicionar URLs de produtos dinamicamente
  addProductUrls(products: any[]): string {
    const baseUrl = 'https://www.modoride.com.br';
    const currentDate = new Date().toISOString().split('T')[0];

    let productSitemap = '';

    products.forEach(product => {
      const category = product.category.toLowerCase().replace(/\s+/g, '-');
      const productUrl = `${baseUrl}/${category}/${product.slug}`;

      productSitemap += '  <url>\n';
      productSitemap += `    <loc>${productUrl}</loc>\n`;
      productSitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      productSitemap += `    <changefreq>weekly</changefreq>\n`;
      productSitemap += `    <priority>0.7</priority>\n`;
      productSitemap += '  </url>\n';
    });

    return productSitemap;
  }
}
