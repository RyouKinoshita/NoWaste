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

// router.get("/product/:id", getSingleProduct);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin", "seller"),
  getAdminProducts
);

router
  .route(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin", "seller")
  )
  .put(upload.array("images", 10), updateProduct)
  .delete(deleteProduct);

module.exports = router;
