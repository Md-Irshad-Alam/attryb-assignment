
const OEM_Specs = require('../models/OEM_Specs');

// Controller function to create a new OEM specs entry
const createOEMSpecs = async (req, res) => {
  try {
    const { name, year, list_price, available_colors, mileage, power, max_speed } = req.body;

    // Create a new OEM specs entry
    const oemSpecs = await OEM_Specs.create({
      name,
      year,
      list_price,
      available_colors,
      mileage,
      power,
      max_speed
    });

    res.status(201).json(oemSpecs);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create OEM specs entry' });
  }
};

// Controller function to get all OEM specs entries
const getAllOEMSpecs = async (req, res) => {
  try {
    const oemSpecs = await OEM_Specs.find();

    res.json(oemSpecs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve OEM specs entries' });
  }
};

// Controller function to get a specific OEM specs entry by ID
const getOEMSpecsById = async (req, res) => {
  try {
    const { id } = req.params;

    const oemSpecs = await OEM_Specs.findById(id);

    if (!oemSpecs) {
      return res.status(404).json({ error: 'OEM specs entry not found' });
    }

    res.json(oemSpecs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve OEM specs entry' });
  }
};

// Controller function to delete a specific OEM specs entry by ID
const deleteOEMSpecsById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEntry = await OEM_Specs.findByIdAndRemove(id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'OEM specs entry not found' });
    }

    res.json({ message: 'OEM specs entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete OEM specs entry' });
  }
};

module.exports = {
  createOEMSpecs,
  getAllOEMSpecs,
  getOEMSpecsById,
  deleteOEMSpecsById
};
