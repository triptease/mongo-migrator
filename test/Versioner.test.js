const expect = require('chai').expect;
const Versioner = require('../src/Versioner');
const removeMongoId = require('./common/database/removeMongoId');
const StubClock = require('./common/clock/StubClock');
const mongoDatabase = require('./common/database/InMemoryMongoDatabase');

describe('Versioner', () => {
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

  it('should store version given migration', async () => {
    const clock = new StubClock();
    const versioner = new Versioner(clock);
    await versioner.updateVersion(connectedDatabase, {
      version: 1,
      filename: 'foo',
    });

    const allVersions = await mongoDatabase.collectionData(
      'version_history'
    );
    expect(allVersions.map(removeMongoId)).to.eql([
      {
        version: 1,
        filename: 'foo',
        date: clock.time(),
      },
    ]);
  });

  it('should get the current version', async () => {
    const clock = new StubClock();
    const versioner = new Versioner(clock);

    await versioner.updateVersion(connectedDatabase, {
      version: 1,
      filename: 'foo',
    });
    expect(await versioner.currentVersion(connectedDatabase)).to.eql(1);

    await versioner.updateVersion(connectedDatabase, {
      version: 2,
      filename: 'foobar',
    });
    expect(await versioner.currentVersion(connectedDatabase)).to.eql(2);
  });
});
