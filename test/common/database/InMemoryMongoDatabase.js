const { MongoClient } = require('mongodb');
const MongoInMemory = require('mongo-in-memory');
const random = require('../random/random');

let mongoRunning = false;
const port = 11111;
let database;
let databaseUrl;
let mongoServerInstance;

const getInMemoryMongoDatabase = async () => {
  if (!mongoRunning) {
    await new Promise((resolve, reject) => {
      mongoServerInstance = new MongoInMemory(port);
      mongoServerInstance.start(error => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          databaseUrl = mongoServerInstance.getMongouri(random.id());
          mongoRunning = true;
          resolve();
        }
      });
    });
  }

  database = await MongoClient.connect(databaseUrl);
  return database;
};

const stop = async () => {
  await database.close();
  if (process.env.CONF !== 'docker') {
    await new Promise((resolve, reject) => {
      mongoServerInstance.stop(error => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          mongoRunning = false;
          resolve();
        }
      });
    });
  }
};

const collectionData = async (collectionName) => {
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
};

module.exports = {
  get: getInMemoryMongoDatabase,
  stop,
  collectionData,
  dropDb: async () => {
    let databaseToDrop = await MongoClient.connect(databaseUrl);
    await new Promise(resolve => databaseToDrop.dropDatabase(resolve));
    await databaseToDrop.close();
  },
};
