const router = require("express").Router();
const {
  register,
  index,
  show,
  update,
  avatar,
  destroy,
} = require("../../controllers/user.controller");

const { restrict } = require("../../middlewares/auth.middleware");
const { image } = require("../../libs/multer");

router.post("/auth/register", register);
router.get("/users", restrict, index);
router.get("/users/:id", restrict, show);
router.put("/users/:id/profile", restrict, update);
router.put("/users/:id/avatar", restrict, image.single("file"), avatar);
router.delete("/users/:id", restrict, destroy);

module.exports = router;
