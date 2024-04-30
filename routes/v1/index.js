const express = require("express");
const router = express.Router();
const Picture = require("../v1/picture.routes");
const { image } = require("../../libs/multer");

router.use("/api/v1", Picture);

module.exports = router;
