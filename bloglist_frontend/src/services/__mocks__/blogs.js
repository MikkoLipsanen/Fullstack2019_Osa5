const blogs = [
  {
    title: 'Tiedän mitä koodasit viime kesänä',
    author: 'Hannu Salama',
    url: 'www.yle.fi',
    likes: 567,
    user: {
      username: 'Jaska',
      name: 'Jokunen'
    }
  },
  {
    title: 'Muotiblogi',
    author: 'Coco Chanel',
    url: 'www.coco.com',
    likes: 5670,
    user: {
      username: 'Coco',
      name: 'C. Chanel'
    }
  },
  {
    title: 'Ruokablogi',
    author: 'Jaakko Nelonen',
    url: 'www.jaakko.fi',
    likes: 57,
    user: {
      username: 'Jaakko',
      name: 'J. Kolmonen'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}


const setToken = newToken => {
  const token = `bearer ${newToken}`

}

export default { getAll, blogs, setToken }