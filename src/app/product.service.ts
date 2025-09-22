import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Product } from './models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Kukirin Toursor X5',
      category: 'scooter',
      description: 'Scooter elétrico premium com motor duplo de 6000W, bateria 60V 38Ah e assento. Performance excepcional para uso off-road e urbano.',
      shortDescription: '6000W motor duplo com assento',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/02/KuKirin-Toursor-X5.jpg',
      featured: true,
      specifications: {
        maxSpeed: '70 km/h',
        range: '80 km',
        battery: '60V 38Ah',
        weight: '45 kg'
      }
    },
    {
      id: 2,
      name: 'Kukirin G2 Pro',
      category: 'scooter',
      description: 'Scooter elétrico de 600W com assento, ideal para uso urbano. Design moderno e confortável para trajetos diários.',
      shortDescription: '600W com assento, uso urbano',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2023/10/Kukirin-g2-PRo.jpg',
      featured: true,
      specifications: {
        maxSpeed: '45 km/h',
        range: '50 km',
        battery: '48V 13Ah',
        weight: '25 kg'
      }
    },
    {
      id: 3,
      name: 'Kukirin G2 Ultra',
      category: 'scooter',
      description: 'Scooter off-road potente com motor duplo 800W*2, ideal para terrenos irregulares e alta performance.',
      shortDescription: '800W*2 off-road, alta performance',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/08/03.KuKirin-G2-Ultra-1-1.jpg',
      featured: true,
      specifications: {
        maxSpeed: '65 km/h',
        range: '70 km',
        battery: '60V 23Ah',
        weight: '35 kg'
      }
    },
    {
      id: 4,
      name: 'Kukirin ienyrid ES1',
      category: 'scooter',
      description: 'Scooter elétrico off-road com motor duplo de 2400W, design robusto para aventuras e uso intensivo.',
      shortDescription: '2400W motor duplo off-road',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/03/IENYRID-ES1-13.jpg',
      featured: false,
      specifications: {
        maxSpeed: '75 km/h',
        range: '85 km',
        battery: '72V 35Ah',
        weight: '42 kg'
      }
    },
    {
      id: 5,
      name: 'Kukirin ienyrid ES60',
      category: 'scooter',
      description: 'Scooter premium com motor duplo de 2400W, máxima potência e autonomia para uso profissional.',
      shortDescription: '2400W premium, máxima potência',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/03/iENYRID-ES60-1-03.jpg',
      featured: false,
      specifications: {
        maxSpeed: '80 km/h',
        range: '90 km',
        battery: '72V 40Ah',
        weight: '48 kg'
      }
    },
    {
      id: 6,
      name: 'Kukirin S1 Max',
      category: 'scooter',
      description: 'Scooter urbano leve e compacto, perfeito para deslocamentos na cidade com facilidade de transporte.',
      shortDescription: 'Leve e compacto para cidade',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/05/KUKIRIN-S1-MAX.jpg',
      featured: false,
      specifications: {
        maxSpeed: '25 km/h',
        range: '35 km',
        battery: '36V 10Ah',
        weight: '15 kg'
      }
    },
    {
      id: 7,
      name: 'Kukirin vipcoo VS3',
      category: 'scooter',
      description: 'Scooter elétrico de 800W com excelente custo-benefício, ideal para iniciantes no mundo da mobilidade elétrica.',
      shortDescription: '800W custo-benefício',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/05/VIPCOO-VS3-KuKirin.jpg',
      featured: false,
      specifications: {
        maxSpeed: '50 km/h',
        range: '55 km',
        battery: '48V 18Ah',
        weight: '28 kg'
      }
    },
    {
      id: 8,
      name: 'Kukirin vipcoo VS6 Pro',
      category: 'scooter',
      description: 'Scooter potente com motor duplo 1200W*2, design moderno e performance superior para uso intensivo.',
      shortDescription: '1200W*2 performance superior',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/06/KuKirin-vipcoo-vs6-pro.jpg',
      featured: true,
      specifications: {
        maxSpeed: '60 km/h',
        range: '65 km',
        battery: '60V 26Ah',
        weight: '38 kg'
      }
    },
    {
      id: 9,
      name: 'Kukirin G3',
      category: 'scooter',
      description: 'Scooter off-road de 1200W com design robusto, perfeito para aventuras e terrenos desafiadores.',
      shortDescription: '1200W off-road robusto',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2022/02/KuKirin-G3-21.jpg',
      featured: false,
      specifications: {
        maxSpeed: '55 km/h',
        range: '60 km',
        battery: '52V 23Ah',
        weight: '32 kg'
      }
    },
    {
      id: 10,
      name: 'Kugoo EBD001 Electric Dirt Bike',
      category: 'bike',
      description: 'Moto elétrica dirt bike off-road com design robusto, ideal para aventuras em terrenos desafiadores e diversão garantida.',
      shortDescription: 'Electric dirt bike off-road',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/08/Electric-Dirt-Bike-PitBike-08.jpg',
      featured: true,
      specifications: {
        maxSpeed: '45 km/h',
        range: '60 km',
        battery: '72V 20Ah',
        weight: '35 kg'
      }
    },
    {
      id: 11,
      name: 'KuKirin hidoes c1 750W Foldable E-Bike',
      category: 'bike',
      description: 'Bicicleta elétrica dobrável de 750W com design moderno e motor potente, ideal para mobilidade urbana e aventuras.',
      shortDescription: '750W dobrável potente',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2025/06/KuKirin-hidoes-c1-4.jpg',
      featured: true,
      specifications: {
        maxSpeed: '35 km/h',
        range: '70 km',
        battery: '48V 15Ah',
        weight: '24 kg'
      }
    },
    {
      id: 12,
      name: 'Kukirin V1 Pro Foldable Lightweight Electric Bike',
      category: 'bike',
      description: 'Bicicleta elétrica dobrável leve e compacta com design premium, perfeita para transporte urbano eficiente.',
      shortDescription: 'Dobrável leve premium',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2024/06/V1-Pro.jpg',
      featured: false,
      specifications: {
        maxSpeed: '25 km/h',
        range: '45 km',
        battery: '36V 12Ah',
        weight: '18 kg'
      }
    },
    {
      id: 13,
      name: 'KuKirin V1 30KM Foldable Electric Bike',
      category: 'bike',
      description: 'Bicicleta elétrica dobrável compacta com 30km de autonomia, perfeita para deslocamentos urbanos e fácil armazenamento.',
      shortDescription: '30km autonomia compacta',
      image: 'https://www.kukiringlobal.com/wp-content/uploads/2024/10/Kugoo-V1.jpg',
      featured: false,
      specifications: {
        maxSpeed: '25 km/h',
        range: '30 km',
        battery: '36V 8Ah',
        weight: '16 kg'
      }
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(product => product.featured));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
