const express = require('express');
const {register, login, getLoggedInUser, MakeDealer} = require('../Auth/Dealer.cotrolar');
const {
  createMarketplaceEntry,
  updateMarketplaceEntryById,
  deleteMarketplaceEntryById,
  deleteMultipleMarketplaceEntries
} = require("../Auth/Market.controller")
const middleware  = require('../MIddleware/auth');
const {createOEMSpecs}  = require("../Auth/OEM.Controller")
const validateDealer = require("../MIddleware/Dealer")
const router = express.Router();


router.get("/", (req,res)=>{
    res.send("i am working ")
})


// Dealers Routes

router.post('/register', register);
router.post('/login', login);
router.get('/getuser', middleware, getLoggedInUser)
router.put('/dealer/:id',middleware, MakeDealer)

// Market_inventry routes

router.post("/create/:id", validateDealer, createMarketplaceEntry);
router.put("/update/:id", validateDealer, updateMarketplaceEntryById);
router.delete("/delete/:id",validateDealer, deleteMarketplaceEntryById)
router.delete("/multidelete/:id",validateDealer, deleteMultipleMarketplaceEntries)


// OEM_inventry 


module.exports = router;