const jwt = require('jsonwebtoken');
const Dealer = require('../models/Dealer_inventer');
const config = require('../config');

async function validateDealer(req, res, next) {
  const authorization = req.headers['authorization'];

  if (authorization) {
    const token = authorization.split(' ').pop();

    if (token) {
      try {
        const decodedToken = jwt.verify(token, config.Secret_key);

        const dealer = await Dealer.findById(decodedToken._id);
        console.log(req.originalUrl)
      //  console.log(dealer)
        if (!dealer) {
          return res.status(401).json({ message: 'Dealer not found' });
        }

        // Check if the user is a dealer
        if (dealer.isDealer==false) {
          return res.status(401).json({ message: 'User is not a dealer' });
        }
        // Check if the dealer status is already true
        if (req.originalUrl === '/auth/dealer' && dealer.isDealer==true) {
          return res.status(400).json({ message: 'Dealer status is already true' });
        }

        // Update the token with the latest dealer data
        const updatedToken = jwt.sign(dealer.toJSON(), config.Secret_key, { expiresIn: '1h' });

        // Modify the request object to contain the authenticated dealer and updated token
        req.user = dealer.toJSON();
        req.token = updatedToken;

        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token provided' });
      }
    } else {
      return res.status(401).json({ message: 'No auth token present' });
    }
  } else {
    return res.status(401).json({ message: 'User is not logged in' });
  }
}

module.exports = validateDealer;
