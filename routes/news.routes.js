const { Router } = require('express')
const router = Router()

const fetch = require('node-fetch');

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let news;

async function genereteNewsList() {
  let id = -1;

  let news = Array(20).fill({}).map((news) => {
    let authorId = randomInteger(0, 2);
    id += 1;
  
    let objNews = {
      id,
      title: `title ${id}`,
      authorId,
      image: `https://picsum.photos/id/${id}/200/300`,
      datetime: new Date(),
    }
    return objNews
  })

  news = await Promise.all(news.map(async(el) => {
    let res = await fetch('http://www.randomtext.me/api/');
    let data = await res.json();
    
    el.description = data.text_out
    return el
  }))

  return news
}

(async() => {
  news = await genereteNewsList();

  router.get(
    '/:id',
    async (req, res) => {
    try {
      const { id } = req.params;
      const newsItem = news.find(el => el.id == id);

      if (newsItem) {
        return res.status(200).json({ ...newsItem })
      }
  
      return res.status(400).json({ message: 'news not found'})
  
    } catch(e) {
      res.status(500).json({ message: 'smth gone wrong, try again' })
    }
  })

  router.get(
    '/',
    async (req, res) => {
    try {
      return res.status(200).json({ news })
    } catch(e) {
      res.status(500).json({ message: 'smth gone wrong, try again' })
    }
  })

})()
module.exports = router