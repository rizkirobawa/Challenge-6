const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  restrict: (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization || !authorization.split(" ")[1]) {
      return res.status(400).json({
        status: false,
        message: "token not provided",
        data: null,
      });
    }

    let token = authorization.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            status: false,
            message: "Invalid token",
            data: null,
          });
        } else if (err.name === "TokenExpiredError") {
          return res.status(402).json({
            status: false,
            message: "Token expired",
            data: null,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: null,
          });
        }
      }
      delete user.iat;
      req.user = user;
    });
    next();
  },
};
