import { makeAutoObservable } from "mobx"

class FiltersStore {
  all_products = [];
  filtered_products = [];
  grid_view = true;
  sort = 'price-lowest';
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
    const grid_view = localStorage.getItem("grid_view")
    if (grid_view) {
      try {
        this.grid_view = JSON.parse(grid_view)
      } catch (e) {
        console.error("Invalid localStorage data:", e)
      }
    }
  }

  setGridView() {
    this.grid_view = true;
    localStorage.setItem("grid_view", JSON.stringify(this.grid_view))
  }

  setListView() {
    this.grid_view = false;
    localStorage.setItem("grid_view", JSON.stringify(this.grid_view))
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

  updateSort(value) {
    console.log(value);
    this.sort = value;
    if (value === 'price-lowest') {
      this.filtered_products = this.filtered_products.sort((a, b) => a.price - b.price);
    } else if (value === 'price-highest') {
      this.filtered_products = this.filtered_products.sort((a, b) => b.price - a.price);
    } else if (value === 'name-a') {
      this.filtered_products = this.filtered_products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'name-z') {
      this.filtered_products = this.filtered_products.sort((a, b) => b.name.localeCompare(a.name));
    }
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

