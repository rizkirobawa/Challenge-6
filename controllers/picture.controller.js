const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imagekit");
const path = require("path");

module.exports = {
  store: async (req, res, next) => {
    try {
      let { title, description } = req.body;

      if (!title || !description || !req.file) {
        return res.status(400).json({
          status: false,
          message: "Title, description, and picture must be required!",
          data: null,
        });
      }

      let exist = await prisma.picture.findFirst({
        where: { title },
      });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "Title already used!",
        });
      }

      let strFile = req.file.buffer.toString("base64");
      let { url } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let picture = await prisma.picture.create({
        data: {
          title,
          description,
          picture_url: url,
        },
      });

      res.status(200).json({
        status: true,
        message: "Picture uploaded successfully",
        data: picture,
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
