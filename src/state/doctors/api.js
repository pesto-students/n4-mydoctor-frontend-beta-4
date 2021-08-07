import API from '../../api';

export function getDoctorsAPI(page = 1, specialization, searchString) {
  return API.post(`/doctors`, {page, specialization, searchString});
}

