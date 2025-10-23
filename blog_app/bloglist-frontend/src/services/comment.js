import axios from "axios";
const baseUrl = "api/comment";

const loggedInUser = localStorage.getItem("loggedInUser");
const token = `Bearer ${JSON.parse(loggedInUser)?.token}`;

const config = {
  headers: { Authorization: token },
};

const comment = (payload) => {
  const response = axios.post(`${baseUrl}`, payload, config);
  return response.data;
};

export default { comment };
