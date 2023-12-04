import { BaseService } from './base-service';

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export type TAwaitedResponse = {
  products: Product[];
  total: number
  skip: number
  limit: number
};

type TQueryParams = {
  limit?: number
  skip: number
}

const BASE_URL = 'https://dummyjson.com'

class ProductService extends BaseService {
  constructor() {
    super(BASE_URL);
  }

  async getAllProducts({ limit = 8, skip = 1 }: TQueryParams) {
    try {
      const { data } = await this.http.get<TAwaitedResponse>(`/products/?limit=${limit}&skip=${skip}`);
      return data
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      const { data } = await this.http.get<Product>(`/products/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, formData: Partial<Product>) {

    try {
      const data = await this.http.put(`/products/${id}`, formData);
      console.log('data', data)
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService()
