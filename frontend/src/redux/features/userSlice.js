// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    editingReviewId: null,
    editedComment: "",
  },
  reducers: {
    getlogindata: (state) => {
      if (!state.user ) {
        const userDataString = localStorage.getItem('user');
     

        const userData = JSON.parse(userDataString);

        if (userData) {
          state.user = userData;
        }
      }
    },
    loginUser: (state, action) => {
      console.log(action.payload);
      // Almacena la información del usuario y el token en el estado
      state.user = action.payload.user;
      // Almacena también en el localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logoutUser: (state) => {
      // Limpia la información del usuario y el token del estado
      state.user = null;
      // Limpia también el localStorage
      localStorage.removeItem('user');
    },
    setEditingReviewId: (state, action) => {
      state.editingReviewId = action.payload;
    },
    setEditedComment: (state, action) => {
      state.editedComment = action.payload;
    },
  },
});

export const { loginUser, logoutUser, getlogindata, setEditingReviewId, setEditedComment } = authSlice.actions;

export default authSlice.reducer;

