import React, { useEffect } from "react"
import GridView from './GridView'
import ListView from './ListView'
import { observer } from "mobx-react-lite";
import Loading from './Loading'

import { productStore, filterStore } from "../stores";

const ProductList = observer(() => {

  useEffect(() => {
    const loadProducts = async () => {
      await productStore.fetchProducts(); // fetch từ API
      filterStore.setAllProducts(productStore.products); // set vào filterStore
    };

    loadProducts()
  }, []);

  const { products_loading } = productStore;
  const { filtered_products, grid_view } = filterStore;


  if (products_loading) {
    return <Loading />
  }

  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  if (grid_view === false) {
    return <ListView products={filtered_products} />
  }

  return <GridView products={filtered_products} />

});

export default ProductList;
