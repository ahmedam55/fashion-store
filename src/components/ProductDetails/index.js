import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import Products from '../../models/Products'
import Error from '../Error'
import Loading from '../Loading'

import styles from './style.module.scss'
import Search from '../../icons/Search'

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

const ProductDetails = ({ match }) => {
  const [activeSize, setActiveSize] = useState(null)
  const [activeColor, setActiveColor] = useState(null)

  const productId = useMemo(() => {
    const idParam = match.params.id
    return idParam != null ? Number(idParam) : 0
  }, [match.params])

  const productQuery = useQuery([], () => Products.get())
  const currentProduct = useMemo(() => {
    const data = productQuery.data
    const hasData = productQuery.data && productQuery.data.length > 0

    if (hasData) {
      return data.find(product => product.id === productId)
    } else {
      return {}
    }
  }, [productQuery.data, productId])

  const colorLabel = useMemo(() => {
    return colorsLabelsLookup[activeColor]
  }, [activeColor])

  const sizeLabel = useMemo(() => {
    return sizesLabelsLookup[activeSize]
  }, [activeSize])

  const activateCurrentSize = (event, size) => {
    event.preventDefault()

    setActiveSize(size)
  }

  const activateCurrentColor = (event, color) => {
    event.preventDefault()

    setActiveColor(color)
  }

  useEffect(() => {
    if (currentProduct.sizes && currentProduct.colors) {
      setActiveSize(currentProduct.sizes[0])
      setActiveColor(currentProduct.colors[0])
    }
  }, [currentProduct])

  return (
    <div className={styles.app}>
      <div className="container">
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src="/images/logo.jpg" alt="logo" />
        </div>

        <ul className={styles.navMenu}>
          <li className={styles.navMenuItem}>
            <a href="#men">Men</a>
          </li>
          <li className={styles.navMenuItem}>
            <a href="#women">Women</a>
          </li>
          <li className={styles.navMenuItem}>
            <a href="#kids">Kids</a>
          </li>
          <li className={styles.navMenuItem}>
            <a href="#ftw">FTW</a>
          </li>
          <li className={styles.navMenuItem}>
            <a href="#accessories">Accessories</a>
          </li>
        </ul>

        <div className={styles.searchWrapper}>
          <input className={styles.search} placeholder="Search..."></input>
          <Search className={styles.searchIcon} />
        </div>

        {productQuery.isLoading ? (
          <Loading></Loading>
        ) : productQuery.isError ? (
          <Error></Error>
        ) : (
          <React.Fragment>
            <ModalImage
              className={styles.productImage}
              small={currentProduct.smallImage}
              large={currentProduct.image}
              alt={currentProduct.title}
            />

            <h1 className={styles.productTitle}>
              {currentProduct.title} {sizeLabel} {colorLabel}
            </h1>

            <div className={styles.productPrice}>
              {currentProduct.currency} {currentProduct.price}
            </div>

            <div className={styles.productSizes}>
              Available Sizes:{' '}
              {currentProduct.sizes.map((size, index) => {
                const isActive = activeSize === size

                return (
                  <a
                    href={`#size-${index}`}
                    key={index}
                    className={classnames(styles.productSize, {
                      [styles.productSizeActive]: isActive,
                    })}
                    onClick={event => activateCurrentSize(event, size)}
                  >
                    {size}{' '}
                  </a>
                )
              })}
            </div>

            <div className={styles.productColors}>
              Colors:{' '}
              <div className={styles.productColorsWrapper}>
                {currentProduct.colors.map((color, index) => {
                  const isActive = activeColor === color

                  return (
                    <a
                      href={`#color-${index}`}
                      key={index}
                      className={classnames(styles.productColor, {
                        [styles.productColorActive]: isActive,
                      })}
                      style={{ backgroundColor: color }}
                      onClick={event => activateCurrentColor(event, color)}
                    >color</a>
                  )
                })}
              </div>
            </div>

            <hr className={styles.divider} />

            <h4 className={styles.productDescriptionTitle}>Description</h4>

            <p className={styles.productDescription}>
              {currentProduct.description}
              <br />
              <br />
              {currentProduct.tags.map((tag, index) => {
                return (
                  <span key={index} className={styles.productTag}>
                    {tag}
                  </span>
                )
              })}
            </p>

            <hr className={styles.divider} />

            <h5 className={styles.productMore}>See more Products </h5>

            <div className={styles.productMoreWrapper}>
              {currentProduct.similarProducts.map(product => {
                const id = product.id

                return (
                  <Link to={`/${id}`} key={id}>
                    <img
                      className={styles.productThumbnail}
                      src={product.image}
                      alt="simialr product"
                    />
                  </Link>
                )
              })}
            </div>
          </React.Fragment>
        )}

        {/* <div className={styles.gistsWrapper}>
          {gistsQuery.isLoading ? (
            <Loading />
          ) : gistsQuery.isError ? (
            <Error />
          ) : (
            gistsQuery.data.map(gist => {
              const id = gist.id
              const gistForks = forksLookupQuery.data != null ? forksLookupQuery.data[id] : []

              return (
                <GistItem
                  key={id}
                  description={gist.description}
                  files={gist.files}
                  url={gist.url}
                  forksList={gistForks}
                />
              )
            })
          )}
        </div> */}
      </div>
    </div>
  )
}

export default ProductDetails
