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
      name: 'ModoScoot Urban Pro',
      category: 'scooter',
      description: 'Scooter elétrico premium com design elegante e tecnologia avançada. Ideal para deslocamentos urbanos com máximo conforto e eficiência.',
      shortDescription: 'Scooter elétrico premium para cidade',
      image: 'https://images.pexels.com/photos/9799072/pexels-photo-9799072.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      specifications: {
        maxSpeed: '25 km/h',
        range: '60 km',
        battery: '48V 15Ah',
        weight: '28 kg'
      }
    },
    {
      id: 2,
      name: 'ModoBike City E-Bike',
      category: 'bike',
      description: 'Bicicleta elétrica urbana com motor potente e bateria de longa duração. Perfeita para quem busca praticidade e sustentabilidade.',
      shortDescription: 'Bicicleta elétrica urbana premium',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      specifications: {
        maxSpeed: '32 km/h',
        range: '80 km',
        battery: '36V 20Ah',
        weight: '22 kg'
      }
    },
    {
      id: 3,
      name: 'ModoScoot Compact',
      category: 'scooter',
      description: 'Scooter elétrico compacto e dobrável, ideal para transporte público e armazenamento em espaços pequenos.',
      shortDescription: 'Scooter compacto e portátil',
      image: 'https://images.pexels.com/photos/7656745/pexels-photo-7656745.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      specifications: {
        maxSpeed: '20 km/h',
        range: '35 km',
        battery: '36V 10Ah',
        weight: '18 kg'
      }
    },
    {
      id: 4,
      name: 'ModoBike Sport',
      category: 'bike',
      description: 'Bicicleta elétrica esportiva com design agressivo e performance superior para aventuras urbanas e trilhas leves.',
      shortDescription: 'Bicicleta elétrica esportiva',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      specifications: {
        maxSpeed: '40 km/h',
        range: '70 km',
        battery: '48V 18Ah',
        weight: '25 kg'
      }
    },
    {
      id: 5,
      name: 'ModoScoot Max',
      category: 'scooter',
      description: 'O mais potente da linha, com motor duplo e bateria de alta capacidade para longas distâncias e alta performance.',
      shortDescription: 'Scooter de alta performance',
      image: 'https://images.pexels.com/photos/9799072/pexels-photo-9799072.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      specifications: {
        maxSpeed: '45 km/h',
        range: '100 km',
        battery: '60V 25Ah',
        weight: '35 kg'
      }
    },
    {
      id: 6,
      name: 'ModoBike Comfort',
      category: 'bike',
      description: 'Bicicleta elétrica com foco no conforto, ideal para passeios relaxantes e deslocamentos longos com máximo bem-estar.',
      shortDescription: 'Bicicleta elétrica confortável',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      specifications: {
        maxSpeed: '28 km/h',
        range: '90 km',
        battery: '48V 16Ah',
        weight: '26 kg'
      }
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products)
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(product => product.featured))
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category))
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id))
  }
}
