const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const Cart = require("./models/Cart");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.post("/cart", (req, res) => {
  const { id, price } = req.body;

  if (!id || !price) {
    return res.status(400).json({ message: "Missing id or price" });
  }

  try {
    Cart.addProduct(id, price);
    res.status(201).json({ message: "Added to cart!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
