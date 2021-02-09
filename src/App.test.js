import { render, screen } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer';
import App from './App'


it('Jest Snapshot Matching: Whole app renders properly', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})


it('Loading shimmer is showing initially', () => {
  render(<App />)

  const loadingShimmer = screen.getByText(/Loading.../i)
  expect(loadingShimmer).toBeInTheDocument()
})


it('Nav Menu is showing properly', () => {
  render(<App />)

  const navMenu = screen.getAllByText(/Men|Women|Kids|FTW|Accessories/i)

  navMenu.map(menuItem => expect(menuItem).toBeInTheDocument())
})
