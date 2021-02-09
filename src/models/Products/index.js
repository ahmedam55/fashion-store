import axios from 'axios'

const Products = {
  get() {
    return axios.get(`/data/index.json`).then(response => {
      const products = response.data

      return products
    })
  },
}

export default Products
