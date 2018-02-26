const Migrator = require('./src/Migrator');
const MigrationLister = require('./src/MigrationLister');
const Versioner = require('./src/Versioner');
const Requirer = require('./src/Requirer');
const Clock = require('./src/Clock');

module.exports = async (connectedDatabase, migrationsPath) => {
  await new Migrator(
    connectedDatabase,
    new Versioner(new Clock()),
    new MigrationLister(migrationsPath),
    new Requirer()
  ).applyMigrations();
};