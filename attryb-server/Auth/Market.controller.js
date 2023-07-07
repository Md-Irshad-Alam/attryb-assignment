const MarketplaceInventory = require('../models/MarketPlace_inventry');

// Controller function to create a new marketplace entry
const createMarketplaceEntry = async (req, res) => {
  try {
    const {
      kms_on_odometer,
      major_scratches,
      original_paint,
      accidents_reported,
      previous_buyers,
      registration_place
    } = req.body;

    // Create a new marketplace entry document
    const marketplaceEntry = new MarketplaceInventory({
      kms_on_odometer,
      major_scratches,
      original_paint,
      accidents_reported,
      previous_buyers,
      registration_place
    });

    // Save the marketplace entry in the database
    await marketplaceEntry.save();

    res.status(201).json(marketplaceEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create marketplace entry' });
  }
};

// Controller function to update a marketplace entry by ID
const updateMarketplaceEntryById = async (req, res) => {
  try {
    const { id } = req.params;
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
  deleteMultipleMarketplaceEntries
};
