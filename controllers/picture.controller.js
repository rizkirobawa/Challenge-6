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
      let { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
        folder: "/challenge-6/pictures",
      });

      let picture = await prisma.picture.create({
        data: {
          title,
          description,
          picture_url: url,
          user_id: req.user.id, 
          picture_id: fileId,
        },
      });

      res.status(200).json({
        status: true,
        message: "Picture uploaded successfully!",
        data: picture,
      });
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res, next) => {
    try {
      const { search } = req.query;

      const pictures = await prisma.picture.findMany({
        where: { title: { contains: search, mode: "insensitive" } },
      });

      pictures.map((pict) => {
        delete pict.picture_id;
        // delete pict.user_id
      });

      res.status(200).json({
        status: true,
        message: "OK",
        data: pictures,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const picture = await prisma.picture.findUnique({
        where: { id: id },
      });

      if (!picture) {
        return res.status(404).json({
          status: false,
          message: `Can't find picture with ID ${id}`,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: picture,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const exist = await prisma.picture.findUnique({ where: { id: id } });

      if (!exist) {
        return res.status(404).json({
          status: true,
          message: `Picture with ID ${id} not found`,
        });
      }

      imagekit.deleteFile(exist.picture_id, async (error, result) => {
        if (error) {
          console.log(error, "ini error");
          return res.status(500).json({
            status: false,
            message: "Failed to delete image from ImageKit",
          });
        } else {
          await prisma.picture.delete({
            where: { id },
          });
          return res.status(200).json({
            status: true,
            message: "Image deleted successfully",
          });
        }
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const exist = await prisma.picture.findUnique({ where: { id: id } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: `Can't find picture with ID ${id}`,
          data: null,
        });
      }

      const { title, description } = req.body;

      if (!title && !description) {
        return res.status(400).json({
          status: false,
          message: "At least one Input must be required",
        });
      }

      const picture = await prisma.picture.update({
        where: { id },
        data: {
          title,
          description,
        },
      });

      res.status(200).json({
        status: true,
        message: "Update picture successfully!",
        data: picture,
      });
    } catch (error) {
      next(error);
    }
  },
};
