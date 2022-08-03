import React from 'react'
import '@testing-library/jest-dom/extend-expect'
//import { render, screen } from '@testing-library/react'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

const blog = {
  title: 'Blog title',
  author : 'costeira',
  url : 'https://fullstackopen.com/en/part5/testing_react_apps',
  likes : 10,
  user :{
    name : 'costeira',
    username : 'costeira'
  }
}

test('renders content', () => {

  const { container } = render(<Blog blog={blog} />)

  //screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog title'
  )

})


/* test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
}) */


describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('cancel')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })


  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})