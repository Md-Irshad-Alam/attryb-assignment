const express = require('express');
const {register, login, getLoggedInUser, MakeDealer} = require('../Auth/Dealer.cotrolar');
const {
  createMarketplaceEntry,
  updateMarketplaceEntryById,
  deleteMarketplaceEntryById,
  deleteMultipleMarketplaceEntries,
  getALLMarket
} = require("../Auth/Market.controller")
const {
  getAllOEMSpecs
} = require('../Auth/OEM.Controller')
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
router.put('/dealer',middleware, MakeDealer)

// Market_inventry routes

router.post("/create", validateDealer, createMarketplaceEntry);
router.put("/update/:id", validateDealer, updateMarketplaceEntryById);
router.delete("/delete/:id",validateDealer, deleteMarketplaceEntryById)
router.get("/getAll",validateDealer, getALLMarket)
router.delete("/multidelete/:id",validateDealer, deleteMultipleMarketplaceEntries)


// OEM_inventry 
router.post("/creatoem", createOEMSpecs),


module.exports = router;