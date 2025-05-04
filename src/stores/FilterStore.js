import { makeAutoObservable, reaction } from "mobx"

class FiltersStore {
  all_products = [];
  filtered_products = [];
  grid_view = true;
  filters = {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setGridView() {
    this.grid_view = true;
  }

  setListView() {
    this.grid_view = false;
  }

  setAllProducts(products) {
    this.all_products = products;
    this.filtered_products = products;

    const prices = products.map(p => p.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    this.filters.min_price = min;
    this.filters.max_price = max;
    this.filters.price = max;
  }

  updateFilters(name, value) {
    this.filters[name] = value;
    this.applyFilters();
  }

  getAllProducts() {
    return this.all_products;
  }

  clearFilters() {
    const products = [...this.all_products];
    const prices = products.map(p => p.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    this.filters = {
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      min_price: min,
      max_price: max,
      price: max,
      shipping: false,
    };
    this.applyFilters();
  }

  applyFilters() {
    let temp = [...this.all_products];
    const { text, company, category, color, price, shipping } = this.filters;

    if (text) {
      temp = temp.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    }
    if (category !== 'all') {
      temp = temp.filter(p => p.category === category);
    }

    if (company !== 'all') {
      temp = temp.filter(p => p.company === company);
    }
    if (color !== 'all') {
      temp = temp.filter(p => p.colors.includes(color));
    }
    if (shipping) {
      temp = temp.filter(p => p.shipping === true);
    }
    if (price) {
      temp = temp.filter(p => p.price <= price);
    }
    this.filtered_products = temp;
  }

};

const filtersStore = new FiltersStore();
export default filtersStore;

