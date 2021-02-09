import $ from 'jquery'

const Products = {
  get(callback) {
    return $.get(`/data/index.json`, data => {
      const products = data

      callback(products)
    })
  },
}

export default Products
