
const OEM_Specs = require('../models/OEM_Specs');

// Controller function to create a new OEM specs entry
const createOEMSpecs = async (req, res) => {
  try {
    const { name, year, list_price, available_colors, mileage, power, max_speed } = req.body;

    // Validate required fields
    if (!name || !year || !list_price || !available_colors || !mileage || !power || !max_speed) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
    console.error(error);
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





module.exports = {
  createOEMSpecs,
  getAllOEMSpecs,

};
