import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TestPage from '@/app/(routes)/test-page/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<TestPage />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})