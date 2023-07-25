import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title by default', () => {
  const blog = {
    id: '1234',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 2,
    user: {
      username: 'testuser',
    },
  }

  render(<Blog blog={blog} user={null} />)

  const titleElement = screen.getByText(/Test Blog by Test Author/i)
  expect(titleElement).toBeDefined()
})

test('clicking "view" button calls event handler once', async () => {
  const blog = {
    id: '1234',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 2,
    user: {
      username: 'testuser',
    },
  }

  render(<Blog blog={blog} user={null} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('URL: http://test.com')

  const likes = screen.getByText('Likes: 2')

  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()

})