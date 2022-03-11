// controllers

const Product = require("../models/products");

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Products routes" });
};
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
