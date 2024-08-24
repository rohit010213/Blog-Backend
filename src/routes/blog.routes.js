import { Router } from "express";
import { createBlog, getBlogs, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(
    upload.fields([{
            name : "image",
            maxCount : 1
    }]),createBlog);

router.route("/").get(getBlogs);
router.route("/:id").put( upload.fields([{
    name : "image",
    maxCount : 1
}]),updateBlog);

router.route("/:id").delete(deleteBlog)



export default router;