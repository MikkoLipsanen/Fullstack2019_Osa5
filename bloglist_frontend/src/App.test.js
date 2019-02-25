import React from 'react'
import App from './App'
import 'jest-dom/extend-expect'

import { 
  render, waitForElement 
} from 'react-testing-library'
jest.mock('./services/blogs')

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Teuvo Testaaja'
}
       

describe('<App />', () => {
  it('if no user is logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    ) 

    expect(component.container).not.toHaveTextContent('Tiedän mitä koodasit viime kesänä')
    expect(component.container).not.toHaveTextContent('Muotiblogi')
    expect(component.container).not.toHaveTextContent('Ruokablogi')
  })
})

describe('<App />', () => {
  it('if user is logged, all blogs are rendered', async () => { 
      
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)
    
    await waitForElement(
      () => component.container.querySelector('.blog')
    ) 
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3) 
  
    expect(component.container).toHaveTextContent('Tiedän mitä koodasit viime kesänä')
    expect(component.container).toHaveTextContent('Muotiblogi')
    expect(component.container).toHaveTextContent('Ruokablogi')
  })
})