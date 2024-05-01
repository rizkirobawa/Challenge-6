const router = require("express").Router();
const { login, verified } = require("../../controllers/auth.controller");
const { restrict } = require("../../middlewares/auth.middleware");

router.post("/auth/login", login);
router.get("/auth/authenticate", restrict, verified);

module.exports = router;
