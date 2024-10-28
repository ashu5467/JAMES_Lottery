export const fetchLotteries = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/lotteries'); // Use your backend API URL
    if (!response.ok) {
      throw new Error('Failed to fetch lotteries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if fetching fails
  }
};
