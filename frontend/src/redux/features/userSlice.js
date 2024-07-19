import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    editingReviewId: null,
    editedComment: "",
  },
  reducers: {
    getlogindata: (state) => {
      if (!state.user) {
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        if (userData) {
          state.user = userData;
        }
      }
    },
    loginUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logoutUser: (state) => {
      state.user = null;
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
