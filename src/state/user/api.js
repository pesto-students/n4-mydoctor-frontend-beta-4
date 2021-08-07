import API from '../../api';

export function getProfileAPI(payload) {
  return API.get('/v1/user/profile', {
    params : payload,
  });
}

export function loginAPI(payload) {
  return API.post('/login', payload);
}

export function signupAPI(payload) {
  return API.post('/signup', payload);
}
