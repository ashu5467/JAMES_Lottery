import axios from 'axios';

const API_URL = '/api/results';

export const fetchResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
