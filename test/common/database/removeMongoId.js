module.exports = item => {
  delete item._id;
  return item;
};
