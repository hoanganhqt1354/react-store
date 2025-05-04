import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { products_endpoint, single_product_endpoint } from '../utils/constants'


class ProductStore {
  isSidebarOpen = false;
  products = [];
  products_loading = false;
  products_error = null;
  single_product_loading = false;
  single_product_error = false;
  single_product = {};

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

  async fetchSingleProduct(id) {
    this.single_product = {};
    this.single_product_loading = true;
    this.single_product_error = null;

    try {
      const response = await axios.get(`${single_product_endpoint}${id}`);
      runInAction(() => {
        this.single_product = response.data;
        this.single_product_loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.single_product_error = error.message || "Failed to fetch product";
        this.single_product_loading = false;
      });
    }
  }

  featured_products() {
    return this.products.filter(p => p.featured === true);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

};

const productStore = new ProductStore();
export default productStore;
