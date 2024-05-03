const express = require("express");
const router = express.Router();
const Picture = require("../v1/picture.routes");
const User = require("../v1/user.routes");
const Auth = require("../v1/auth.routes");

const swaggerUI = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const path = require("path");

const swagger_path = path.resolve(__dirname, "../../docs/docs-api.yaml");
const file = fs.readFileSync(swagger_path, "utf-8");

const swaggerDocument = yaml.parse(file);
router.use(
  "/api/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

router.use("/api/v1", Auth);
router.use("/api/v1", User);
router.use("/api/v1", Picture);

// Welcome
app.get('/', (req,res) => res.json({status: true, message: "Welcome To Users Post Picture Backend API", data: null}))

module.exports = router;
