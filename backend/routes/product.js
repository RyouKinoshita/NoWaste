const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getSellerProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin", "seller"),
  upload.array("images", 10),
  newProduct
);

router.get("/products", getProducts);

router.get(
  "/seller/products",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getSellerProducts
);

router.get("/product/:id", getSingleProduct);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

router
  .route("/admin/product/:id", isAuthenticatedUser, authorizeRoles("admin"))
  .put(upload.array("images", 10), updateProduct)
  .delete(deleteProduct);

module.exports = router;
