const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  deleteUser,
  updateUser,
  getUsersByRole,
  sendFeedback,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/me", isAuthenticatedUser, getUserProfile);

router.put("/password/update", isAuthenticatedUser, updatePassword);

router.put(
  "/me/update",
  isAuthenticatedUser,
  upload.single("avatar"),
  updateProfile
);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);

router.post('/send-feedback', sendFeedback)

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, getUserDetails)
  .delete(isAuthenticatedUser, deleteUser)
  .put(isAuthenticatedUser, upload.none(), updateUser);

router.get(
  "/admin/users/sellers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUsersByRole
);
module.exports = router;
