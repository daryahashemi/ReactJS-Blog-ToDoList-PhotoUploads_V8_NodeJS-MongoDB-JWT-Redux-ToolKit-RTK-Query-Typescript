import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {username:'', email: '', password: ''}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect'
    }

    // username conflict/username duplicate
    if (err.message === 'username conflict') {
        errors.username = 'That username is already registered'
    }

    // duplicate email
    if(err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // valdation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    // password reset errors
    if (err.message === 'email not found') {
        errors.email = 'That email is not registered'
    }

    if (err.message === 'password length error') {
        errors.password = 'Minimum password length is 6 characters'
    }

    return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

const post_signup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        await User.signup(username)
        const user = await User.create({ username, email, password })
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ username: user.username })
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ ...errors })
    } 
}

const post_login = async (req, res) => {
    const  { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ username: user.username })

    } 
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ ...errors })
    }
}

const get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ msg: 'JWT deleted. You are logged out.' })
}

const post_forgetpassemail = async (req, res) => {
    const  { email } = req.body
    try {
        const user = await User.confirmemail(email)
        res.status(200).json({ id: user.id })
    } 
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ ...errors })
    }
}

const patch_resetpass = async (req, res) => {
    const id = req.params.id
    const password = req.body.password

    try {
        await User.passwordvalidation(password)
        const salt = await bcrypt.genSalt()
        const newpassword = await bcrypt.hash(password, salt)  
        let updates = { password: newpassword }

        const user = await User.findByIdAndUpdate(id, updates)
        res.status(200).json({ msg: `${user.username}'s password has been successfully reset.` })
    } 
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ ...errors })
    }
}

// const get_onloadauth = async (req, res) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         if(id) {
//             const user = await User.findById(id)
//             res.status(200).json({ user: user.username })
//         }    
//     }
// }

const delete_account = async (req, res) => {
    const  { email, password } = req.body
    try {
        const user = await User.login(email, password)
        if(user) {
            console.log(user.id)
            const deleted = await User.findByIdAndDelete(user.id)
            if(deleted) {
                res.status(200).json({ msg: `${user.username}'s account has been successfully deleted.` })
            }
        }
    } 
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ ...errors })
    }
}

export default {
    post_signup, 
    post_login, 
    get_logout,
    post_forgetpassemail,
    patch_resetpass,
    // get_onloadauth,
    delete_account
}