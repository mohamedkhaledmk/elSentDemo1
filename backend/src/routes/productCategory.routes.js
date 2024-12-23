import { Router } from "express";
import {
  createProductCategory,
  getAllProductCategories,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getCatgegoriesMoreDetail,
  getTopCategories,
} from "../controllers/productCategory.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";
import { uploadSingle } from "../middlewares/multer.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/top").get(verifyUser, verifyAdmin, getTopCategories);
router.route("/detail").get(verifyUser, verifyAdmin, getCatgegoriesMoreDetail);

router.route("/:id").get(getProductCategory);
router.route("/").get(getAllProductCategories);

router
  .route("/")
  .post(verifyUser, verifyAdmin, uploadSingle, createProductCategory);
router
  .route("/:id")
  .put(verifyUser, verifyAdmin, uploadSingle, updateProductCategory);
router.route("/:id").delete(verifyUser, verifyAdmin, deleteProductCategory);

export default router;
