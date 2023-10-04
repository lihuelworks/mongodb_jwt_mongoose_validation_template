
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }

    /* only added for demo/template purposes */
    const id = new Date().getDate()

    /* try to keep payload small, better experience for user */
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    console.log("req.user console.log 👉🏻 " , req.user.username)

    const luckyNumber = Math.floor(Math.random() * 100)
    
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
    login, dashboard
}