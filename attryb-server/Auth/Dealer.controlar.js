const Dealer = require('../models/Dealer_inventer');

// Controller function to create a new marketplace entry
const createMarketplaceEntry = async (req, res) => {
  try {
    const { dealerId, oemId, /* other relevant data */ } = req.body;

    // Create a new marketplace entry
    const marketplaceEntry = await Dealer.create({
      dealer: dealerId,
      oem: oemId,
      // Assign other relevant data to the corresponding fields
    });

    res.status(201).json(marketplaceEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create marketplace entry' });
  }
};

// Controller function to get all marketplace entries
const getAllMarketplaceEntries = async (req, res) => {
  try {
    const marketplaceEntries = await Dealer.find()
      .populate('dealer', 'name') // Populate the 'dealer' field with the name of the dealer
      .populate('oem', 'name') // Populate the 'oem' field with the name of the OEM
      .exec();

    res.json(marketplaceEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve marketplace entries' });
  }
};

// Controller function to get a specific marketplace entry by ID
const getMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const marketplaceEntry = await Dealer.findById(id)
      .populate('dealer', 'name') // Populate the 'dealer' field with the name of the dealer
      .populate('oem', 'name') // Populate the 'oem' field with the name of the OEM
      .exec();

    if (!marketplaceEntry) {
      return res.status(404).json({ error: 'Dealer entry not found' });
    }

    res.json(marketplaceEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve marketplace entry' });
  }
};

// Controller function to update a specific marketplace entry by ID
const updateMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { mileage, previous_owners, maintenance_history, accident_history, condition, kms_on_odometer } = req.body;

    // Find and update the marketplace entry
    const updatedMarketplaceEntry = await MarketPlaceInventory.findByIdAndUpdate(
      id,
      {
        mileage,
        previous_owners,
        maintenance_history,
        accident_history,
        condition,
        kms_on_odometer
      },
      { new: true } // Set `new` option to get the updated document as the result
    );

    if (!updatedMarketplaceEntry) {
      return res.status(404).json({ error: 'Marketplace entry not found' });
    }

    res.json(updatedMarketplaceEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update marketplace entry' });
  }
};



// Controller function to delete a specific marketplace entry by ID
const deleteMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await Dealer.findByIdAndRemove(id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Dealer entry not found' });
    }

    res.json({ message: 'Dealer entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete marketplace entry' });
  }
};

module.exports = {
  createMarketplaceEntry,
  getAllMarketplaceEntries,
  getMarketplaceEntryById,
  deleteMarketplaceEntryById,
  updateMarketplaceEntryById
};
