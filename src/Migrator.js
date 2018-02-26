class Migrator {
  constructor(connectedDatabase, versioner, lister, requirer, logger = console) {
    this.connectedDatabase = connectedDatabase;
    this.versioner = versioner;
    this.lister = lister;
    this.requirer = requirer;
    this.logger = logger;
  }

  async applyMigrations() {
    const currentVersion = await this.versioner.currentVersion(this.connectedDatabase);
    const migrationsToApply = this.lister.listMigrations(currentVersion);

    for (let i = 0; i < migrationsToApply.length; i++) {
      let migration = migrationsToApply[i];
      this.logger.log('Apply migration: ' + migration.filename);

      await this.requirer.require(migration.path).apply(this.connectedDatabase);
      await this.versioner.updateVersion(this.connectedDatabase, migration);
    }
  }
}

module.exports = Migrator;
