class Requirer {
  require(path) {
    return require(path);
  }
}

module.exports = Requirer;
