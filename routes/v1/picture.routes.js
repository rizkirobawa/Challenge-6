const router = require("express").Router();
const {
  store,
  index,
  show,
  destroy,
  update,
} = require("../../controllers/picture.controller");
const { image } = require("../../libs/multer");

router.post("/pictures", image.single("file"), store);
router.get("/pictures", index);
router.get("/pictures/:id", show);
router.delete("/pictures/:id", destroy);
router.put("/pictures/:id", update);

module.exports = router;
