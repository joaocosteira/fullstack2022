import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlog={handleNewBlog} />)

  const inputs = screen.getAllByRole('textbox')
  //const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('create')

  //Another option, since we're working based on the input order
  //is to simply add a placeholder to each input and then filter
  //each one of them by its placeholder text:
  //ex: const input = screen.getByPlaceholderText('write here note content')


  //Another possibility is to simply select elements by id:
  // Example:
  // <input ... id='note-input'/>
  // const input = container.querySelector('#note-input')
  await user.type(inputs[0], 'Add a pretty title')
  await user.type(inputs[1], 'costeira')
  await user.type(inputs[2], 'https://www.google.com')
  await user.click(sendButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)

  //console.log(handleNewBlog.mock.calls[0][0])
  expect(handleNewBlog.mock.calls[0][0].title).toBe('Add a pretty title')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('costeira')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('https://www.google.com')
})