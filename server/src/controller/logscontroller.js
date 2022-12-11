const model = require('../models/logs');

const index = async (req, res) => {
  try {
    const data = await model.all();
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
};

const show = async (req, res) => {
  try {
    const data = await model.find(req.params.id);
    return res.json(data[0]);
  } catch (err) {
    return res.json(err);
  }
};

const create = async (req, res) => {
  try {
    const data_1 = await model.create(req.body);
    return res.json(data_1);
  } catch (err) {
    return res.json(err);
  }
};

const update = (req, res) => {
  res.json('update');
};

const remove = async (req, res) => {
  try {
    const data = await model.remove(req.params.id);
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  remove: remove
};
