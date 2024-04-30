const router = require("express").Router();
const { store } = require("../../controllers/picture.controller");
const { image } = require("../../libs/multer");

router.post("/pictures", image.single("file"), store);

module.exports = router;
