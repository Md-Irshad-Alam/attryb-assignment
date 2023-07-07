// const User = require('../models/user.model');

// // Middleware to check if the user is a dealer
// const isDealer = async (req, res, next) => {
//   try {
//     const {id}  = req.params;
  
//     // Check if the user is a dealer
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (!user.Dealer) {
//       return res.status(403).json({ error: 'Access forbidden. Only dealers can edit car details.' });
//     }

//     // Allow the dealer to proceed
//     next();
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to verify dealer' });
//   }
// };

// module.exports = isDealer;
const checkDealerAuthorization = (req, res, next) => {
  const dealer = req.user; // Assuming the authenticated dealer is stored in req.user

  if (!dealer || !dealer.isDealer) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  next();
};
module.exports  = checkDealerAuthorization