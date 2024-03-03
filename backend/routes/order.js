const express = require("express");
const router = express.Router();

const {
    getAdminOrder
  } = require("../controllers/orderController");
  const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

  router.get(
    "/admin/order",
    isAuthenticatedUser,
    authorizeRoles("admin", "seller"),
    getAdminOrder
  );

  module.exports = router;