import { createSlice } from '@reduxjs/toolkit';
import {
  getDoctorsAPI,
} from './api';


const initialState = {
  doctors: [],
  pages: 10,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    showLoading(state) {
      state.loading = true;
      state.doctors = [];
      state.error = null;
    },
    hideLoading(state) {
      state.loading = false;
      state.doctors = [];
      state.error = null;
    },
    loadDoctorsSuccess(state, action) {
      state.doctors = action.payload.data;
      state.pages = action.payload.pages;
      state.loading = false;
      state.error = null;
    },
    loadDoctorsFailed(state, action) {
      state.doctors = [];
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  loadDoctorsSuccess,
  loadDoctorsFailed,
} = slice.actions;

export default slice.reducer;


export const loadDoctors = (page, specialization, searchString) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await getDoctorsAPI(page, specialization, searchString);
    dispatch(loadDoctorsSuccess(res.data));
  } catch (err) {
    dispatch(loadDoctorsFailed(err));
  }
};