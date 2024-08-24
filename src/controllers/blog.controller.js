import { Blog } from '../models/blog.model.js';
import ApiError from '../utils/ApiError.js';

const createBlog = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const blogImage = req.files?.image?.[0]?.path;

        if (!title || !description || !blogImage) {
            throw new ApiError(400, "All fields are required");
        }

        const newBlog = await Blog.create({ title, description, image: blogImage });
        return res.status(201).json({ success: true, blog: newBlog });
    } catch (error) {
        next(error);
    }
};

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const blogImage = req.files?.image?.[0]?.path;

        const updatedBlog = await Blog.findByIdAndUpdate(id, 
            { 
                title, 
                description, 
                image: blogImage || undefined 
            }, 
            { new: true }
        );

        if (!updatedBlog) {
            throw new ApiError(404, "Blog not found");
        }

        return res.status(200).json({ success: true, blog: updatedBlog });
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            throw new ApiError(404, "Blog not found");
        }

        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { createBlog, getBlogs, updateBlog, deleteBlog };
