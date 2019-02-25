import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


it('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Tiedän mitä koodasit viime kesänä',
    author: 'Hannu Salama',
    likes: 567
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  afterEach(cleanup)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('renders content', () => {
  const blog = {
    title: 'Tiedän mitä koodasit viime kesänä',
    author: 'Hannu Salama',
    likes: 567
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  afterEach(cleanup)

  expect(component.container).toHaveTextContent(
    'Tiedän mitä koodasit viime kesänä' 
  )
  expect(component.container).toHaveTextContent(
    'Hannu Salama'
  )
  expect(component.container).toHaveTextContent(
    '567'
  )
})