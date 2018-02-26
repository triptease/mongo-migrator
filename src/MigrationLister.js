const validMigrationRegex = /^([0-9]+)_.*$/;
const fs = require('fs');
const path = require('path');

class MigrationLister {
  constructor(migrationsPath) {
    this.migrationsPath = migrationsPath;
  }

  listMigrations(currentVersion = 0) {
    const convertToVersionedMigration = filename => ({
      filename: filename,
      path: path.resolve(this.migrationsPath, filename),
      version: Number.parseInt(validMigrationRegex.exec(filename)[1]),
    });

    const filenames = fs.readdirSync(this.migrationsPath);
    if (this.filenamesValid(filenames)) {
      const allMigrations = filenames
        .map(convertToVersionedMigration)
        .sort(
          (versioned1, versioned2) => versioned1.version - versioned2.version
        );
      return allMigrations.filter(vm => vm.version > currentVersion);
    } else {
      throw new Error('Invalid migration filename present');
    }
  }

  filenamesValid(filenames) {
    return filenames.reduce((result, filename) => {
      return result && validMigrationRegex.test(filename);
    }, true);
  }
}

module.exports = MigrationLister;
