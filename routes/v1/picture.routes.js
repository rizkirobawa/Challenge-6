const router = require("express").Router();
const {
  store,
  index,
  show,
  destroy,
  update,
} = require("../../controllers/picture.controller");
const { restrict } = require("../../middlewares/auth.middleware");
const { image } = require("../../libs/multer");

router.post("/pictures", restrict, image.single("file"), store);
router.get("/pictures", restrict, index);
router.get("/pictures/:id", restrict, show);
router.delete("/pictures/:id", restrict, destroy);
router.put("/pictures/:id", restrict, update);

module.exports = router;
