const express = require('express')

const Users = require('./users-model')

const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const secrets = require('../auth/secrets.js')

const checkValidate = [
    check('username')
        .isLength({ min: 8})
        .withMessage('Must be at least 8 characters long'),
    check('password')
        .isLength({ min: 8})
        .withMessage('Must be at least 8 characters long')
        .matches(/\d/).withMessage('Must contain a number')
]

router.post('/register', checkValidate, (req, res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password)
    user.password = hash

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    Users.addUser(user)
        .then(addedUser => {
            const token = generateToken(user)
            const userAdded = { id: user.id, username: user.username}

            res.status(201).json({ userAdded, token})
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to add user'})
        })
})

router.post('/login', (req,res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ message: `${user.username} is logged in.`, token})
            } else {
                res.status(401).json({ message: 'Unauthorized access'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to log into system'})
        })
})

router.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(errors => {
            res.status(500).json({ message: 'Failed to retrieve list of users'})
        })
})

// router.delete('/users/:id', (req, res) => {
//     const { id } = req.params

//     Users.remove(id)
//         .then(user => {
//             const newUser = { id: id, username: user.username}
//             res.status(202).json(newUser)
//         })
//         .catch(error => {
//             res.status(500).json({ error: 'User could not be deleted'})
//         })
// })

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Users.remove(id)
        const edited = await Users.find()

        console.log(deleted)
        if (deleted) {
            res.json(edited)
        } else {
            res.status(404).json({ message: 'Could not find the correct data'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete data'})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

function validateUser(req, res, next) {
    const body = req.body

    if (!body) {
        res.status(400).json({ message: 'Fill in required fields'})
    }
    if (!body.username) {
        res.status(400).json({ message: 'Fill in the username field'})
    }
    if (!body.password) {
        res.status(400).json({ message: 'Fill in the password field'})
    }
    else {
        next()
    }
}

function validateUserId(req, res, next) {
    const { id } = req.params

    Users.findById(id) 
        .then(user => {
            if (req.user.id === req.params.id) {
                
                next()
            } else {
                res.status(400).json({ message: 'Failed to find user with specified ID'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Unspecified error'})
        })
        
};

module.exports = router