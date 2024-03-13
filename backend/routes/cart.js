const express = require("express");
const router = express.Router();

const {
    addToCartItem, 
    getAllCartItem,
    outCartStatus,
    onCartStatus,
} = require("../controllers/cartController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/add-to-cart", addToCartItem);
router.get("/user/get-cartItems/:id", getAllCartItem);
router.put(
    "/cart-status-update/:id",
    outCartStatus
  );
router.put(
    "/oncart-status-update/:id",
    onCartStatus
  );

module.exports = router;
