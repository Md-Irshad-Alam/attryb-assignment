const express = require('express');
const {register, login, getLoggedInUser, updatestatusdealer} = require('../Auth/auth.cotrolar');
const middleware  = require('../MIddleware/auth');
const isDealer  = require('../MIddleware/Dealer');

const {
  getAllMarketplaceEntries,
  getMarketplaceEntryById,
 
}  = require("../Auth/Dealer.controlar")
const {createOEMSpecs,}  = require("../Auth/OEM.Controller")

const {createMarketplaceEntry,updateMarketplaceEntryById,deleteMarketplaceEntryById} = require("../Auth/Market.controller")
  
const {checkDealerAuthorization} = require("../MIddleware/Dealer")

const router = express.Router();


router.get("/", (req,res)=>{
    res.send("i am working ")
})


// Dealers Routes

router.post('/register', register);
router.post('/login', login);
router.get('/getuser', middleware, getLoggedInUser)

router.put('/dealer:id',middleware, updatestatusdealer)

// Market_inventry routes
router.post('/createinvt', checkDealerAuthorization, createMarketplaceEntry)

router.post('/deleteinvt/:id', checkDealerAuthorization, deleteMarketplaceEntryById)

router.put('/updateinvt/:id',checkDealerAuthorization, updateMarketplaceEntryById)

router.get('/getuser', middleware, getLoggedInUser)


module.exports = router;