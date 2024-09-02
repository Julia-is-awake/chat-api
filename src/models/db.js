const { MongoClient, ObjectId, Collection } = require("mongodb");

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.DB_HOST);
  await client.connect();

  singleton = client.db(process.env.DB);
  return singleton;
}

let findAll = async (collection) => {
  const db = await connect();
  return await db.collection(collection).find().toArray();
};

async function insertOne(collection, objeto) {
  const db = await connect();
  return db.collection(collection).insertOne(objeto);
}

let findOne = async (collection, _id) => {
  const db = await connect();
  // console.log("Id com ObjectId: " + new ObjectId(_id));
  // console.log("Id sem ObjectId: " + _id);

  const teste = await db.collection(collection);

  let obj = await teste.findOne({ _id: ObjectId.createFromHexString(_id) });

  console.log({ obj });
  if (obj != null) return obj;
  else console.log("Obj " + collection + " é null");

  return false;
};

let updateOne = async (collection, object, param) => {
  const db = await connect();
  let result = await db
    .collection(collection)
    .updateOne(param, { $set: object });
  return result;
};

let deleteOne = async (collection, _id) => {
  const db = await connect();
  let result = await db
    .collection(collection)
    .deleteOne({ _id: ObjectId.createFromHexString(_id) });
  return result;
};

module.exports = {
  findAll,
  insertOne,
  findOne,
  updateOne,
  deleteOne,
};
