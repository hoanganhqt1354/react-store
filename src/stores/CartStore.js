import { makeAutoObservable } from "mobx"

class CartStore {
  cart = this.getLocalStorage();
  total_items = 0;
  total_amount = 0;
  shipping_fee = 534;

  constructor() {
    makeAutoObservable(this);
  }

  getLocalStorage() {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  }

  addToCart(id, color, amount, product) {
    const item = this.cart.find((item) => item.id === id + color);
    if (item) {
      const tempCart = this.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount }
        }
        else {
          return cartItem;
        }
      });
      this.cart = tempCart;
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image,
        price: product.price,
        max: product.stock,
      };
      console.log(newItem);
      this.cart.push(newItem);
    }
    console.log(this.cart);
    this.setLocalStorage();
  }

  removeItem(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.setLocalStorage();
  }

  toggleAmount(id, type) {
    const tempCart = this.cart.map((item) => {
      if (item.id === id) {
        if (type === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else if (type === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
        return item;
      }
      return item;
    });

    this.cart = tempCart;
    this.setLocalStorage();
  }


  countTotals() {
    const { total_items, total_amount } = this.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    this.total_items = total_items;
    this.total_amount = total_amount + this.shipping_fee;
  }

  clearCart() {
    this.cart = [];
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

};

const cartStore = new CartStore();
export default cartStore;

