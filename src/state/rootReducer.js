import { combineReducers } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import userReducer from './user/slice';
import doctorsReducer from './doctors/slice';
import commonReducer from './common/slice';
import appointmentReducer from "./appointment/slice";

enableMapSet();
const rootReducer = combineReducers({
  user: userReducer,
  doctors: doctorsReducer,
  common: commonReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
