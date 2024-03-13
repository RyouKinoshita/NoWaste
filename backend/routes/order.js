const express = require("express");
const router = express.Router();

const {
  getAdminOrder,
  orderCreate,
  getUserOrders,
  // getUserFillUpForm
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get(
  "/admin/order",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminOrder
);
router.post("/order-create", isAuthenticatedUser, orderCreate);
router.get("/user/orders/:id", getUserOrders);
// router.get(
//   "/user/fill-up-form/:id",
//   getUserFillUpForm
// );

module.exports = router;
