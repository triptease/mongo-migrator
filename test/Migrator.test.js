const { MongoClient } = require('mongodb');
const expect = require('chai').expect;

const Migrator = require('../src/Migrator');
const Requirer = require('../src/Requirer');
const Versioner = require('../src/Versioner');
const MigrationLister = require('../src/MigrationLister');
const removeMongoId = require('./common/database/removeMongoId');
const StubClock = require('./common/clock/StubClock');

const mongoDatabase = require('./common/database/InMemoryMongoDatabase');

describe('Migrator', () => {
  let connectedDatabase;

  beforeEach(async () => {
    connectedDatabase = await mongoDatabase.get();
  });

  afterEach(async () => {
    try {
      await mongoDatabase.dropDb();
    } catch (e) {
      throw e;
    }
    await mongoDatabase.stop();
  });

  it('applies database migrations', async () => {
    const clock = new StubClock();
    const versioner = new Versioner(clock);
    const lister = new MigrationLister('./test/migrations');
    const requirer = new Requirer();

    const migrator = new Migrator(connectedDatabase, versioner, lister, requirer);

    await migrator.applyMigrations();

    const test1Data = await mongoDatabase.collectionData('test1');
    const test2Data = await mongoDatabase.collectionData('test2');
    const versionHistory = await mongoDatabase.collectionData(
      'version_history'
    );

    expect(test1Data.map(removeMongoId)).to.eql([{ foo: 'bar' }]);
    expect(test2Data.map(removeMongoId)).to.eql([{ foo: 'baz' }]);
    expect(versionHistory.map(removeMongoId)).to.eql([
      {
        date: clock.time(),
        filename: '1_testmigration.js',
        version: 1,
      },
      {
        date: clock.time(),
        filename: '2_testmigration.js',
        version: 2,
      },
    ]);
  });
});
