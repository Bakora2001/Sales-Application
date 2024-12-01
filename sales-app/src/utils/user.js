import axios from "axios";
import { useRouter } from "vue-router";

export const loginUser = async (email, password) => {
  let token = null; // Use let so it can be reassigned
  let error = null; // Use let so it can be reassigned

  await axios
    .post("http://localhost:5000/api/login", {
      email,
      password,
    })
    .then((response) => {
      token = response.data.token; // Assign the token
    })
    .catch((err) => {
      error = {
        status: err.response.status,
        message: err.response.data.message,
      }; // Assign the error
    });

  return { token, error };
};

export const signupUser = async (name, email, password) => {
  let token = null; // Use let so it can be reassigned
  let error = null; // Use let so it can be reassigned

  await axios
    .post("http://localhost:5000/api/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      token = response.data.token; // Assign the token
    })
    .catch((err) => {
      error = {
        status: err.response.status,
        message: err.response.data.message,
      }; // Assign the error
    });

  return { token, error };
};

export const checkUser = async () => {
  const token = localStorage.getItem("token");

  let user = null;
  let error = null;

  await axios
    .get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      user = response.data;
    })
    .catch((err) => {
      error = {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

  return { user, error };
};
