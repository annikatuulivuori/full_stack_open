import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title by default', () => {
  const blog = {
    id: '123',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }

  render(<Blog blog={blog} user={null} />)

  const titleElement = screen.getByText(/Test Blog by Test Author/i)
  expect(titleElement).toBeDefined()
})