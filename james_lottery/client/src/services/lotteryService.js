export const fetchLotteries = async () => {
  // Mock lottery data with draw date, draw time, and frequency
  const mockData = [
    {
      id: 1,
      name: "Mega Lottery",
      price: 10,
      description: "Win big with our Mega Lottery! Draws every week.",
      drawDate: "2024-10-15",
      drawTime: "19:00", // 7 PM
      frequency: "Weekly",
      status: "Active",
    },
    {
      id: 2,
      name: "Super Jackpot",
      price: 15,
      description: "A chance to win the Super Jackpot! Don't miss out.",
      drawDate: "2024-10-20",
      drawTime: "20:00", // 8 PM
      frequency: "Weekly",
      status: "Active",
    },
    {
      id: 3,
      name: "Daily Lottery",
      price: 5,
      description: "Participate daily and win exciting prizes!",
      drawDate: "Every day",
      drawTime: "18:00", // 6 PM
      frequency: "Daily",
      status: "Active",
    },
    {
      id: 4,
      name: "Holiday Special Lottery",
      price: 20,
      description: "Join our special holiday lottery for a chance to win grand prizes!",
      drawDate: "2024-12-25",
      drawTime: "21:00", // 9 PM
      frequency: "Monthly",
      status: "Upcoming",
    },
    {
      id: 5,
      name: "Charity Lottery",
      price: 10,
      description: "Support a good cause while trying your luck!",
      drawDate: "2024-11-01",
      drawTime: "17:00", // 5 PM
      frequency: "Monthly",
      status: "Active",
    },
  ];

  // Simulating a fetch call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000); // Simulate network delay
  });
};
