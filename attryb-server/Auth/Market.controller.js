const MarketplaceInventory = require('../models/MarketPlace_inventry');
const Dealer = require('../models/Dealer_inventer')
const Oem_specs = require("../models/OEM_Specs");
// Controller function to create a new marketplace entry
// let id1 = "64a84b73a4a61b291deb79ac"
// let id1 = "64a84af06e500a71e6d01063"
// let id1 = "64a84b73a4a61b291deb79ac"
let id1 = "64a84b7da4a61b291deb79ae"

const createMarketplaceEntry = async (req, res) => {
  try {
    const {
      name,
      image,
      mileage,
      previous_owners,
      maintenance_history,
      accident_history,
      condition,
      original_paint,
      kms_on_odometer,
      accidents_reported,
      previous_buyers,
      registration_place
    } = req.body;

    // Get the dealer ID from the authenticated user
    const dealerId = req.user._id;
    // Find the dealer by ID to validate if they are authorized to add the details
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }
    let d1 = await Oem_specs.findById(id1);
 
  console.log(d1)

    // Create a new marketplace entry document
    const marketplaceEntry = new MarketplaceInventory({
      dealer: dealer._id,
      name:d1.name,
      image,
      mileage,
      previous_owners,
      maintenance_history,
      accident_history,
      condition,
      original_paint,
      accidents_reported,
      previous_buyers,
      registration_place,
      kms_on_odometer,
      
    });

    // Save the marketplace entry in the database
    await marketplaceEntry.save();

    res.status(201).json(marketplaceEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create marketplace entry' });
  }
};


// Controller function to update a marketplace entry by ID
const updateMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.user._id;
    const updateFields = req.body;

    const updatedMarketplaceEntry = await MarketplaceInventory.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedMarketplaceEntry) {
      return res.status(404).json({ error: 'Marketplace entry not found' });
    }

    res.json(updatedMarketplaceEntry);
  } catch (error) {

    res.status(500).json({ error: 'Failed to update marketplace entry' });
  }
};

const getALLMarket = async(req,res)=>{

    try {
      const oemSpecs = await MarketplaceInventory.find();
  
      res.json(oemSpecs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve OEM specs entries' });
    }

}

// Controller function to delete a marketplace entry by ID
const deleteMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMarketplaceEntry = await MarketplaceInventory.findByIdAndDelete(id);

    if (!deletedMarketplaceEntry) {
      return res.status(404).json({ error: 'Marketplace entry not found' });
    }

    res.json({ message: 'Marketplace entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete marketplace entry' });
  }
};

// Controller function to delete multiple marketplace entries
const deleteMultipleMarketplaceEntries = async (req, res) => {
  try {
    const { ids } = req.body;

    const deletedMarketplaceEntries = await MarketplaceInventory.deleteMany({
      _id: { $in: ids }
    });

    if (!deletedMarketplaceEntries) {
      return res.status(404).json({ error: 'Marketplace entries not found' });
    }

    res.json({ message: 'Marketplace entries deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete marketplace entries' });
  }
};

module.exports = {
  createMarketplaceEntry,
  updateMarketplaceEntryById,
  deleteMarketplaceEntryById,
  deleteMultipleMarketplaceEntries,
  getALLMarket
};
