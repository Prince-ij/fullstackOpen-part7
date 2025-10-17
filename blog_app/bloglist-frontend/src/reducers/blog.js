import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { Notify } from "./notification";

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
        const blog = state.find(blog => blog.id === action.payload)
        ++blog.likes
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
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
        dispatch(Notify({type:'success', content: 'Blog added successfully'}))
    }
    catch (err) {
        dispatch(Notify({ type: "error", content: "Add Blog failed !" }));
    }
  };
};

export const likeBlog = (id, blogPost) => {
    return async dispatch => {
        try {
            const blog = await blogService.likeBlog(id, blogPost)
            dispatch(like(id))
            dispatch(
              Notify({
                type: "success",
                content: `You liked ${blog.title}`,
              })
            );
        }
        catch(err) {
            dispatch(Notify({ type: "error", content: "An error occured" }));
        }
    }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch(remove(id))
      dispatch(Notify({type:'success', content: `blog has been deleted`}))
    }
    catch(err) {
      dispatch(Notify({ type: "error", content: "An error occured" }));
    }
  }
}

export const { add, like, remove, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
