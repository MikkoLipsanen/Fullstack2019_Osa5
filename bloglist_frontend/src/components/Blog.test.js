import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library' 
import Blog from './Blog'


describe('<Blog />', () => {

  const blog = {
    title: 'Tiedän mitä koodasit viime kesänä',
    author: 'Hannu Salama',
    url: 'www.yle.fi',
    likes: 567,
    user: {
      username: 'Jaska',
      name: 'Jokunen'
    }
  }
  
  let component 

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  afterEach(cleanup)

  it('at start only blog title and author are displayed', () => {
    expect(component.container).not.toHaveTextContent('www.yle.fi')
  })
  
  it('after clicking the text field, hidden content is displayed', () => {
    const button = component.getByText(/Tiedän mitä koodasit viime kesänä/)
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.yle.fi')
    expect(component.container).toHaveTextContent(567)
    expect(component.container).toHaveTextContent('Jokunen')
  })

})