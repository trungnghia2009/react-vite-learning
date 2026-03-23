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

const updateUserAPI = () => {};

export { createUserAPI, updateUserAPI };
