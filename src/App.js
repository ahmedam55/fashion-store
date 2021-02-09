import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductDetails from './components/ProductDetails'

import './style.scss'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/:id?" component={ProductDetails}></Route>
      </Router>
    </QueryClientProvider>
  )
}

export default App
