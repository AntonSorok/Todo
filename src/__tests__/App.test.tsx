import {render, screen} from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'

test('рендерит заголовок', () => {
    render(<App/>);
    expect(screen.getByText(/Todo 'Pro'/i)).toBeInTheDocument()
})