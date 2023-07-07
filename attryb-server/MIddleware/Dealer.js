
const Dealer = require('../models/Dealer_inventer')

const validateDealer = async (req, res, next) => {
  try {
    const dealerId = req.params.id; // Assuming the dealer ID is passed as a route parameter

    // Fetch the dealer from the database
    const dealer = await Dealer.findById(dealerId);
    console.log(dealer)
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    // Check if the dealer is authorized (isDealer is true)
    if (!dealer.isDealer) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Pass the dealer object to the next middleware or route handler
    req.dealer = dealer;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate dealer' });
  }
};


module.exports = validateDealer;