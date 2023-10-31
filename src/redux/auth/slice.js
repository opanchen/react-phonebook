import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refreshUser,
  register,
  resendVerifyMessage,
  updateAvatar,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
  },
  token: null,
  isLoggedIn: false,
  isRegistered: false,
  isVerifyMessageResended: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("register action: ", action);
        console.log("register payload: ", action.payload);
        state.isRegistered = true;
        state.user.email = action.payload.email;
        state.isVerifyMessageResended = false;
      })
      .addCase(register.pending, (state) => state)
      .addCase(register.rejected, (state) => state)

      .addCase(login.fulfilled, (state, action) => {
        console.log("login action: ", action);
        console.log("login payload: ", action.payload);

        const { user, token } = action.payload;

        state.user.name = user.name;
        state.user.email = user.email;
        state.user.avatar = user.avatarURL;
        state.token = token;
        state.isLoggedIn = true;
        state.isRegistered = false;
      })
      .addCase(login.pending, (state) => state)
      .addCase(login.rejected, (state) => state)

      .addCase(logout.fulfilled, (state) => {
        state.user.name = null;
        state.user.email = null;
        state.user.avatar = null;
        state.token = null;
        state.isLoggedIn = false;
        console.log("user logged out...");
      })
      .addCase(logout.pending, (state) => state)
      .addCase(logout.rejected, (state) => state)

      .addCase(refreshUser.fulfilled, (state, action) => {
        console.log("refresh action: ", action);
        console.log("refresh payload: ", action.payload);

        const { name, email, avatarURL } = action.payload;

        state.user.name = name;
        state.user.email = email;
        state.user.avatar = avatarURL;

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(updateAvatar.fulfilled, (state, action) => {
        console.log("update avatar action: ", action);
        state.user.avatar = action.payload.avatarURL;
      })
      .addCase(updateAvatar.pending, (state) => state)
      .addCase(updateAvatar.rejected, (state) => state)

      .addCase(resendVerifyMessage.fulfilled, (state, action) => {
        console.log("resend verify message action: ", action);

        state.isVerifyMessageResended = true;
        state.user.email = null;
      })
      .addCase(resendVerifyMessage.pending, (state) => state)
      .addCase(resendVerifyMessage.rejected, (state) => state);
  },
});

export const authReducer = authSlice.reducer;
