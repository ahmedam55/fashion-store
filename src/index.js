import $ from 'jquery'
import lightbox from 'lightbox2'

import Products from './models/Products'

import './styles/styles.scss'
import './styles/product-details.scss'

const $app = $('#app')

const colorsLabelsLookup = {
  '#f5f4fb': 'White',
  '#fedf48': 'Yellow',
  '#17161b': 'Black',
  '#3f2b65': 'Purple',
}

const sizesLabelsLookup = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  XL: 'X-Large',
}

const loadingView = `
<svg
  width="605"
  height="905"
  viewBox="0 0 605 905"
  class="loading"
  fill="#ecebeb"
>
  <rect x="133" y="92" rx="5" ry="5" width="331" height="432" />
  <rect x="12" y="599" rx="0" ry="0" width="166" height="16" />
  <rect x="12" y="634" rx="0" ry="0" width="87" height="12" />
  <rect x="12" y="678" rx="0" ry="0" width="259" height="12" />
  <rect x="12" y="724" rx="0" ry="0" width="80" height="10" />

  <rect x="12" y="749" rx="5" ry="5" width="34" height="28" />
  <rect x="54" y="749" rx="5" ry="5" width="34" height="28" />
  <rect x="96" y="749" rx="5" ry="5" width="34" height="28" />
  <rect x="138" y="749" rx="5" ry="5" width="34" height="28" />

  <rect x="12" y="828" rx="0" ry="0" width="96" height="13" />
  <rect x="12" y="863" rx="0" ry="0" width="543" height="10" />
  <rect x="12" y="889" rx="0" ry="0" width="543" height="11" />
</svg>`

const errorView = `<div class="error">Something went wrong, please try again...</div>`

const successView = ({ currentProduct, sizeLabel, colorLabel, activeColor, activeSize }) =>
  `<a href="${currentProduct.smallImage}" data-lightbox="image-1"     data-title="${currentProduct.title} ${sizeLabel} ${colorLabel}">
      <img
        class="productImage"
        src=${currentProduct.smallImage}
        alt=${currentProduct.title}
      /></a>

      <h1 class="productTitle">
        ${currentProduct.title} ${sizeLabel} ${colorLabel}
      </h1>

      <div class="productPrice">
        ${currentProduct.currency} ${currentProduct.price}
      </div>

      <div class="productSizes">
        Available Sizes: 
        ${currentProduct.sizes
          .map(size => {
            const isActive = activeSize === size

            return `<a
              href="#"
              class="productSize ${isActive ? 'productSizeActive' : ''}"
              data-size="${size}"
            >
              ${size}  
            </a>`
          })
          .join('')}
      </div>

      <div class="productColors">
        Colors:  
        <div class="productColorsWrapper">
          ${currentProduct.colors
            .map((color, index) => {
              const isActive = activeColor === color

              return `<a
                href="#"
                class="productColor ${isActive ? 'productColorActive' : ''}"
                data-color="${color}"
                style="background-color: ${color}"
              ></a>`
            })
            .join('')}
        </div>
      </div>

      <hr class="divider" />

      <h4 class="productDescriptionTitle">Description</h4>

      <p class="productDescription">
        ${currentProduct.description}
        <br />
        <br />
        ${currentProduct.tags
          .map(tag => {
            return `<span class="productTag">
              ${tag}
            </span>`
          })
          .join('')}
      </p>

      <hr class="divider" />

      <h5 class="productMore">See more Products </h5>

      <div class="productMoreWrapper">
        ${currentProduct.similarProducts
          .map(product => {
            const id = product.id

            return `<a href="#" data-similar="${id}">
              <img class="productThumbnail" src="${product.image}" alt="similar product" />
            </a>`
          })
          .join('')}
      </div>`

const render = newDOM => {
  document.getElementById('app').innerHTML = newDOM
}

const attachEvents = callback => {
  $('#app').on('click', '[data-color]', event => {
    event.preventDefault()

    setActiveSize(size)
  })
}

render(loadingView)

Products.get(products => {
  const idParam = 0

  const productId = idParam != null ? Number(idParam) : 0

  let currentProduct = products.find(product => product.id === productId)

  let activeSize = currentProduct.sizes[0]
  let activeColor = currentProduct.colors[0]

  let colorLabel = colorsLabelsLookup[activeColor]

  let sizeLabel = sizesLabelsLookup[activeSize]

  const renderSuccessView = () => {
    render(successView({ currentProduct, sizeLabel, colorLabel, activeColor, activeSize }))
  }

  $app.on('click', '[data-color]', event => {
    event.preventDefault()

    const color = event.currentTarget.getAttribute('data-color')
    activeColor = color
    colorLabel = colorsLabelsLookup[activeColor]

    renderSuccessView()
  })

  $app.on('click', '[data-size]', event => {
    event.preventDefault()

    const size = event.currentTarget.getAttribute('data-size')
    activeSize = size
    sizeLabel = sizesLabelsLookup[activeSize]

    renderSuccessView()
  })

  $app.on('click', '[data-similar]', event => {
    event.preventDefault()

    const newProductId = event.currentTarget.getAttribute('data-similar')

    currentProduct = products.find(product => product.id === Number(newProductId))

    activeSize = currentProduct.sizes[0]
    activeColor = currentProduct.colors[0]
    colorLabel = colorsLabelsLookup[activeColor]
    sizeLabel = sizesLabelsLookup[activeSize]

    renderSuccessView()
  })

  renderSuccessView()

  lightbox.init()
})
  .then()
  .catch(error => {
    render(errorView)
  })
