const { Router } = require('express')
const router = Router()

let parentId = -1;
let id = -1;
let comments = []
let commnetText = 'text comment';

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateComments(parentId, storyId) {
  let count = randomInteger(0, 3);

  for(let i=0; i < count; i++) {
    comments.push({
      id: ++id,
      parentId,
      storyId,
      comment: commnetText,
      datetime: new Date()
    })
  }
}

function generateLevelFirst() {
  parentId += 1;
  generateComments(parentId, parentId);

  if(parentId < 19) {
    generateLevelFirst()
  }
}

function generateChilds() {
  comments.forEach(comment => {
    let parentId = comment.id;
    generateComments(parentId, comment.parentId)
  })
}

function setComments() {
  generateLevelFirst();

  let levels = randomInteger(1, 3);

  for(let i=0; i < levels; i++) {
    generateChilds()
  }

  return comments
}

setComments();

router.get(
  '/:id',
  async (req, res) => {
  try {
    const { id } = req.params;

    const storiesComments = comments.filter(comment => comment.storyId == id);
    if (storiesComments) {
      return res.status(200).json(storiesComments)
    }

    return res.status(400).json({ message: 'comments not found'})

  } catch(e) {
    res.status(500).json({ message: 'smth gone wrong, try again' })
  }
})

module.exports = router