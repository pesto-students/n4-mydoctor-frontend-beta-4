import { createSlice } from '@reduxjs/toolkit';
import {
  getSpecializationsAPI,
} from './api';


const initialState = {
  specializations: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showLoading(state) {
      state.loading = true;
      state.specializations = null;
      state.error = null;
    },
    hideLoading(state) {
      state.loading = false;
      state.specializations = null;
      state.error = null;
    },
    loadSpecializationsSuccess(state, action) {
      state.specializations = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadSpecializationsFailed(state, action) {
      state.specializations = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  loadSpecializationsSuccess,
  loadSpecializationsFailed
} = slice.actions;

export default slice.reducer;

export const loadSpecializations = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await getSpecializationsAPI();
    dispatch(loadSpecializationsSuccess(res.data.data));
  } catch (err) {
    dispatch(loadSpecializationsFailed(err));
  }
};

