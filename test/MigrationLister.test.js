const expect = require('chai').expect;

const MigrationLister = require('../src/MigrationLister');
const path = require('path');

describe('MigratorLister', () => {
  it('should return all migrations given current version of 0', () => {
    const migrationLister = new MigrationLister(
      path.resolve('./test/migrations')
    );
    expect(migrationLister.listMigrations(0)).to.eql([
      {
        filename: '1_testmigration.js',
        path: path.resolve('./test/migrations/1_testmigration.js'),
        version: 1,
      },
      {
        filename: '2_testmigration.js',
        path: path.resolve('./test/migrations/2_testmigration.js'),
        version: 2,
      },
    ]);
  });

  it('should return all migrations given current version of undefined', () => {
    const migrationLister = new MigrationLister(
      path.resolve('./test/migrations')
    );
    expect(migrationLister.listMigrations(undefined)).to.eql([
      {
        filename: '1_testmigration.js',
        path: path.resolve('./test/migrations/1_testmigration.js'),
        version: 1,
      },
      {
        filename: '2_testmigration.js',
        path: path.resolve('./test/migrations/2_testmigration.js'),
        version: 2,
      },
    ]);
  });

  it('should return all migrations with a version number higher than the given version number', () => {
    const migrationLister = new MigrationLister(
      path.resolve('./test/migrations')
    );
    expect(migrationLister.listMigrations(1)).to.eql([
      {
        filename: '2_testmigration.js',
        path: path.resolve('./test/migrations/2_testmigration.js'),
        version: 2,
      },
    ]);
  });

  it('throw an error when trying to list invalid formatted migrations', () => {
    const migrationLister = new MigrationLister(
      path.resolve('./test/invalid_migrations')
    );

    expect(() => migrationLister.listMigrations(1)).to.throw(
      'Invalid migration filename present'
    );
  });
});
