import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getUserBlogs = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const create = async (blogPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogPost, config);
  return response.data;
};

const likeBlog = async (id, blogPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blogPost, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, create, likeBlog, deleteBlog, getUserBlogs };
