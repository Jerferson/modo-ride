export interface Product {
  id: number
  name: string
  category: 'scooter' | 'bike'
  description: string
  shortDescription: string
  image: string
  featured: boolean
  specifications: {
    maxSpeed: string
    range: string
    battery: string
    weight: string
  }
}
