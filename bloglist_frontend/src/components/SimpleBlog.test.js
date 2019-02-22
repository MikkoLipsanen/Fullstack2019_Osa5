import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

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

  component.debug()

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