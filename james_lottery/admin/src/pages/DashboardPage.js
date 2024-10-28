import React from 'react';

const DashboardPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-indigo-800 p-8 min-h-screen">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {[
          { title: "Total Lotteries", value: 45, color: "bg-blue-200" },
          { title: "Total Users", value: 1250, color: "bg-green-200" },
          { title: "Total Sales", value: "$25,400", color: "bg-yellow-200" },
          { title: "Active Lotteries", value: 10, color: "bg-red-200" },
          { title: "Upcoming Lotteries", value: 3, color: "bg-purple-200" },
          { title: "Recent Winners", value: 5, color: "bg-pink-200" },
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
          <li className="text-gray-700">Lottery "Christmas Special" created on 20th October</li>
          <li className="text-gray-700">User "John Doe" registered on 19th October</li>
          <li className="text-gray-700">Winner "Jane Smith" declared for Lottery "Summer Bonanza"</li>
          <li className="text-gray-700">Lottery "Halloween Spooktacular" closed with total sales of $5000</li>
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
