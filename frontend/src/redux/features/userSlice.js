import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    favorites: [],
    editingReviewId: null,
    editedComment: '',
  },
  reducers: {
    getlogindata: (state) => {
      const userDataString = localStorage.getItem('user');
    
      if (userDataString) {
        state.user = JSON.parse(userDataString);
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
    addFavorite: (state, action) => {
      if (state.user) {
        state.favorites.push(action.payload);
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    removeFavorite: (state, action) => {
      if (state.user) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginUser,
  logoutUser,
  getlogindata,
  setEditingReviewId,
  setEditedComment,
  addFavorite,
  removeFavorite,
} = authSlice.actions;

export default authSlice.reducer;
