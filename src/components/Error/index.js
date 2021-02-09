import { memo } from 'react'

import styles from './style.module.scss'

const Error = memo(() => {
  return <div className={styles.error}>Something went wrong, please try again...</div>
})

export default Error
