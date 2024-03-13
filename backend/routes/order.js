const express = require("express");
const router = express.Router();

const {
  getAdminOrder,
  orderCreate,
  getUserOrders,
  updateOrderStatus,
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
router.put("/order/:id/status", isAuthenticatedUser, updateOrderStatus);
// router.get(
//   "/user/fill-up-form/:id",
//   getUserFillUpForm
// );

module.exports = router;
