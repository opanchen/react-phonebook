import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

//? For development:
const LOCAL_SERVER = "http://localhost:3030/api/";
const REMOTE_SERVER = "https://phonebook-backend-kuop.onrender.com/api/";

// Create & export special axios instance to use it (with current config) inside another redux-slice
export const phonebookAPI = axios.create();
phonebookAPI.defaults.baseURL = LOCAL_SERVER;

// Utility to add JWT
const setAuthHeader = (token) => {
  phonebookAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  phonebookAPI.defaults.headers.common.Authorization = "";
};

// POST @ /users/register
// body: { name, email, password }
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await phonebookAPI.post("/users/register", credentials);
      // After successfull registration the user gets an email with special link to verification page.
      // Don't add the verification token to the HTTP header.

      return res.data;
    } catch (error) {
      toast.error(
        "Something went wrong. User with this email probably exists."
      );
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// POST @ /users/login
// body: { email, password }
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await phonebookAPI.post("/users/login", credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      if (error.response.data?.message === "Email is not verified") {
        toast.warning(
          "Please check out your email messages and verify your account to continue..."
        );
      } else {
        toast.error("Invalid login or password. Please try again!");
      }
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// POST @ /users/logout
// headers: Authorization: Bearer token
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await phonebookAPI.post("/users/logout");
      // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// GET @ /users/current
// headers: Authorization: Bearer token
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    // Reading the token from the state via getState()
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await phonebookAPI.get("/users/current");
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// PATCH @ users/avatars
// headers: Authorization: Bearer token
// body: formData = {avatar: file}
export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("fd: ", formData.getAll("avatar"));
      const res = await phonebookAPI.patch("/users/avatars", formData);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const resendVerifyMessage = createAsyncThunk(
  "auth/resendVerify",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = phonebookAPI.post("/users/verify/", credentials);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
