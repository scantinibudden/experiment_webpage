
const { mongoose, allowCORS } = require('../db');
const ExperimentModel = require('../models/ExperimentModel');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    allowCORS(req, res, () => {});
    res.status(200).end();
    return;
  }
  allowCORS(req, res, () => {});
  const userId = req.query.userId;

  try {
    const userExists = await ExperimentModel.exists({ userId: userId });
    if (userExists){
      res.json({ userExists: true });
    }else{
      res.json({ userExists: false });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}