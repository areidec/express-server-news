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

let parentId = -1;
let id = -1;
let comments = []
let commnetText = 'text comment';

function setComments() {
  generateLevelFirst();

  let levels = randomInteger(1, 3);

  for(let i=0; i < levels; i++) {
    generateChilds()
  }

  return comments
}





//http://www.randomtext.me/api/lorem/p-1/5-13