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

const updateUserAPI = (_id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const userData = {
    _id,
    fullName,
    phone,
    avatar,
  };
  return axios.put(URL_BACKEND, userData);
};

const deleteUserAPI = (_id) => {
  const URL_BACKEND = `/api/v1/user/${_id}`;
  return axios.delete(URL_BACKEND);
};

const uploadAvatarAPI = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": folder,
    },
  };

  const formData = new FormData();
  formData.append("fileImg", file);

  return axios.post(URL_BACKEND, formData, config);
};

const fetchAllUsersAPI = (currentPage, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const userData = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, userData);
};

const loginUserAPI = (username, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const userData = {
    username: username,
    password: password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, userData);
};

const getAccountInfoAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

const logoutUserAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

export {
  createUserAPI,
  fetchAllUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  uploadAvatarAPI,
  registerUserAPI,
  loginUserAPI,
  getAccountInfoAPI,
  logoutUserAPI,
};
