import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalLotteries: 0,
    totalUsers: 0,
    totalSales: 0,
    activeLotteries: 0,
    upcomingLotteries: 0,
    recentWinners: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard'); // Replace with your API endpoint
        const data = await response.json();
        
        // Assuming your API response has a structure like this
        setMetrics({
          totalLotteries: data.totalLotteries,
          totalUsers: data.totalUsers,
          totalSales: data.totalSales,
          activeLotteries: data.activeLotteries,
          upcomingLotteries: data.upcomingLotteries,
          recentWinners: data.recentWinners,
        });

        setRecentActivities(data.recentActivities); // Assume this is an array
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {[
          { title: "Total Lotteries", value: metrics.totalLotteries, color: "bg-blue-200" },
          { title: "Total Users", value: metrics.totalUsers, color: "bg-green-200" },
          { title: "Total Sales", value: `$${metrics.totalSales}`, color: "bg-yellow-200" },
          { title: "Active Lotteries", value: metrics.activeLotteries, color: "bg-red-200" },
          { title: "Upcoming Lotteries", value: metrics.upcomingLotteries, color: "bg-purple-200" },
          { title: "Recent Winners", value: metrics.recentWinners, color: "bg-pink-200" },
        ].map((metric, index) => (
          <div key={index} className={`${metric.color} p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
            <h2 className="text-xl font-semibold text-gray-800">{metric.title}</h2>
            <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Create New Lottery",
            "View Lotteries",
            "Manage Users",
            "View Reports",
            "Announce Results"
          ].map((action, index) => (
            <button
              key={index}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-5 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <ul className="list-disc ml-4 space-y-2">
          {recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-700">{activity}</li>
          ))}
        </ul>
      </div>

      {/* Graphs (Placeholder for future enhancement) */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sales Analytics (Coming Soon)</h2>
        <p className="text-gray-600">Graph showing sales over time will be displayed here.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
