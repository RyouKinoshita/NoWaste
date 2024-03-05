const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articleController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/article/create", upload.single("image"), createArticle);
router.get("/article/articles",  getAllArticles);
router.get("/article/get-single-article/:_id",  getSingleArticle);
router.put("/article/update-article/:id", upload.single("image"),  updateArticle);
router.delete("/article/delete-article/:id", deleteArticle);

module.exports = router;