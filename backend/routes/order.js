const express = require("express");
const router = express.Router();

const {
  getAdminOrder,
  orderCreate,
  getUserOrders,
  // getUserFillUpForm
  getSellerOrder,
  getSellerOrdersList,
  orderStatusComplete,
  getSellerAllOrder,
  getSellerSingleOrder,
  getUserSingleOrder
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get(
  "/admin/order",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminOrder
);
router.get(
  "/seller/got-order/:userId",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getSellerOrder
);
router.get(
  "/seller/got-singe-order/:id",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getSellerSingleOrder
);
router.get(
  "/user/got-singe-order/:id",
  getUserSingleOrder
);
router.get(
  "/seller/got-all-order/:userId",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getSellerAllOrder
);
router.get(
  "/seller/got-orderslist/:userId",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getSellerOrdersList

);
router.post("/order-create", isAuthenticatedUser, orderCreate);
router.get("/user/orders/:id", getUserOrders);
// router.get(
//   "/user/fill-up-form/:id",
//   getUserFillUpForm
// );

router.put(
  "/order-status-complete/:id",
  // onCartStatus
  orderStatusComplete
);

module.exports = router;
