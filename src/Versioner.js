class Versioner {
  constructor(clock) {
    this.clock = clock;
  }

  async currentVersion(database) {
    const versionHistory = await database.collection('version_history');
    const versions = await versionHistory.find({}).toArray();
    return Math.max(...versions.map(v => v.version));
  }

  async updateVersion(database, migration) {
    const versionHistory = await database.collection('version_history');
    versionHistory.insert({
      date: this.clock.time(),
      version: migration.version,
      filename: migration.filename,
    });
  }
}

module.exports = Versioner;
