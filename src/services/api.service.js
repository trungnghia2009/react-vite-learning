import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const userData = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, userData);
};

const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const userData = {
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, userData);
};

const fetchAllUsersAPI = () => {
  const URL_BACKEND = "/api/v1/user";
  return axios.get(URL_BACKEND);
};

export { createUserAPI, fetchAllUsersAPI, updateUserAPI };
