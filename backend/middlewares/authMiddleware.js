import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'

// in order to generate a unique ACCESS_TOKEN_SECRET, first write 'node' in the terminal and then this command in terminal and press Enter:
// require('crypto').randomBytes(64).toString('hex')
// OR
// const crypto = require('crypto');
// const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

dotenv.config()

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
          if (err) {
            return res.status(401).json({error: 'Authorization token required'})
              } else {
              console.log(decodedToken);
              next();
          }
      });
  } else {
    return res.status(401).json({error: 'Authorization token required'})
  }
}

export default requireAuth