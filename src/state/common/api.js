import API from '../../api';

export function getSpecializationsAPI() {
  return API.get('/metadata/specializations');
}
