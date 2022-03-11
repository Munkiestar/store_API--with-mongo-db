// controllers

const Product = require("../models/products");

const getAllProducts = async (req, res) => {
  // find only products by query string e.g. /products?featured=true
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  // filter object
  const queryObj = {};

  // basically code doesn't break if we add property that doesn't exist
  // on products' schema model
  if (featured) {
    queryObj.featured = featured === "true";
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    // $regex: show all products where 'name' query params contains this letter/s e.g. 'a'
    queryObj.name = { $regex: name, $options: "i" };
  }

  // console.log("queryObj: ", queryObj);
  let result = Product.find(queryObj);

  // sort
  if (sort) {
    console.log(sort);
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  // numeric filters
  if (numericFilters) {
    // console.log(numericFilters);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObj);
  }

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name , price");
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
