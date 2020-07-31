const { Router } = require('express')
const router = Router()

const users = [
  { id: 0, firstName: 'Bob', lastName: 'Johnson'},
  { id: 1, firstName: 'Coca', lastName: 'Cola'},
  { id: 2, firstName: 'Artem', lastName: 'Filipenko'}
]

router.get(
  '/:id',
  async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = users.find(user => user.id == id);
    if (candidate) {
      return res.status(200).json({ ...candidate })
    }

    return res.status(400).json({ message: 'user not found'})

  } catch(e) {
    res.status(500).json({ message: 'smth gone wrong, try again' })
  }
})

module.exports = router