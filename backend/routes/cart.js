const express = require("express");
const router = express.Router();

const {
    addToCartItem, getAllCartItem,
} = require("../controllers/cartController");

router.post("/add-to-cart", addToCartItem);
router.get("/user/get-cartItems/:id", getAllCartItem);

module.exports = router;
