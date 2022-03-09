require("./db/mongo");
const PORT = 5000;
const express = require("express");
const app = express();

// error handlers
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/errorHandler");

const productRouter = require("./routes/products");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1> <a href='/api/v1/products'>Products</a>`);
});

app.use("/api/v1/products", productRouter);

// products route
app.use(notFound);
app.use(handleError);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
