import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { products_endpoint } from '../utils/constants'

class ProductStore {
  products = [];
  products_loading = false;
  products_error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    this.products_loading = true;
    this.products_error = null;

    try {
      const response = await axios.get(products_endpoint);
      runInAction(() => {
        this.products = response.data;
        this.products_loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.products_error = error.message || "Failed to fetch products";
        this.products_loading = false;
      });
    }
  }

  featured_products() {
    return this.products.filter(p => p.featured === true);
  }

};

const productStore = new ProductStore();
export default productStore;
