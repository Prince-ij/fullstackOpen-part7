import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { Notify } from "./notification";
import commentService from "../services/comment";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    add(state, action) {
      return state.concat(action.payload);
    },
    like(state, action) {
      const blog = state.find((blog) => blog.id === action.payload);
      ++blog.likes;
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    comment(state, action) {
      const blog = state.find((blog) => blog.id === action.payload.blogId);
      blog.comments.push(action.payload.body);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const makeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(add(newBlog));
      dispatch(Notify({ type: "success", content: "Blog added successfully" }));
    } catch (err) {
      dispatch(Notify({ type: "error", content: "Add Blog failed !" }));
    }
  };
};

export const likeBlog = (id, blogPost) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.likeBlog(id, blogPost);
      dispatch(like(id));
      dispatch(
        Notify({
          type: "success",
          content: `You liked ${blog.title}`,
        })
      );
    } catch (err) {
      dispatch(Notify({ type: "error", content: "An error occured" }));
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(remove(id));
      dispatch(Notify({ type: "success", content: `blog has been deleted` }));
    } catch (err) {
      dispatch(Notify({ type: "error", content: "An error occured" }));
    }
  };
};

export const addComment = (blogId, body) => {
  return async (dispatch) => {
    try {
      await commentService.comment({ blogId, body });
      dispatch(comment({blogId, body}));
      dispatch(Notify({ type: "success", content: `comment added` }));
    } catch (err) {
      dispatch(Notify({ type: "error", content: `${err}` }));
    }
  };
};

export const { add, like, remove, setBlogs, comment } = blogSlice.actions;
export default blogSlice.reducer;
