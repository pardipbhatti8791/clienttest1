import axios, { AxiosInstance } from 'axios';

export class BaseService {
  protected http: AxiosInstance;

  constructor(baseURL: string) {
    console.log(baseURL)
    this.http = axios.create({
      baseURL,
    });
  }
}
