import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalname = file.originalname;
    const fileExtension = originalname.substring(
      originalname.lastIndexOf(".") + 1
    );
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

export default upload
