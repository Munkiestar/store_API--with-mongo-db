const db = require("./db/mongo");

const Product = require("./models/products");

const productsJSON = require("./products.json");

// populate mongo db with products
const seedDB = async () => {
  try {
    await Product.deleteMany();
    await Product.create(productsJSON);
    console.log("success");
  } catch (err) {
    console.log(err);
  }
};

seedDB().then(() => db.close());
