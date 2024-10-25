import axios from 'axios';

const API_URL = '/api/reports';

export const fetchReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
