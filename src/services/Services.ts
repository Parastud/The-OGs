import api from '.';


export const fetchSitetypeService = async () => {
  const response = await api.get('/rest/user/public/onboard/get/site-type-list');
  return response.data;
};