import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
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

  const testUser = {
    username: 'testuser',
  }

  render(<Blog blog={blog} user={testUser}  />)

  const button = screen.getByText('view')
  await userEvent.click(button)

  const url = screen.getByText('URL: http://test.com')

  const likes = screen.getByText('Likes: 2')

  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()

})

test('clicking "like" button twice calls event handler twice', async () => {
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

  const testUser = {
    username: 'testuser',
  }

  const mockHandle = jest.fn()

  render(<Blog blog={blog} user={testUser} handleUpdateLikes={mockHandle} />)

  const buttonView = screen.getByText('view')
  userEvent.click(buttonView)

  await waitFor(() => {
    screen.getByText('like')
  })

  const buttonLike = screen.getByText('like')
  userEvent.click(buttonLike)
  userEvent.click(buttonLike)

  expect(mockHandle).toHaveBeenCalledTimes(2)
})