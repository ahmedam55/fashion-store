import { memo } from 'react'
import ContentLoader from 'react-content-loader'

import styles from './style.module.scss'

const MyLoader = memo(props => (
  <ContentLoader
    speed={2}
    width={605}
    height={905}
    viewBox="0 0 605 905"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className={styles.loading}
    uniqueKey="2wl92si"
    {...props}
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
  </ContentLoader>
))

export default MyLoader
