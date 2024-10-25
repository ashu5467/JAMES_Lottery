    import React from 'react';

    const DashboardPage = () => {
    return (
        <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Lotteries</h2>
            <p className="text-3xl">45</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl">1,250</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-3xl">$25,400</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Lotteries</h2>
            <p className="text-3xl">10</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Upcoming Lotteries</h2>
            <p className="text-3xl">3</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Recent Winners</h2>
            <p className="text-3xl">5</p>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Create New Lottery</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">View Lotteries</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Manage Users</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">View Reports</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Announce Results</button>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="list-disc ml-4">
            <li>Lottery "Christmas Special" created on 20th October</li>
            <li>User "John Doe" registered on 19th October</li>
            <li>Winner "Jane Smith" declared for Lottery "Summer Bonanza"</li>
            <li>Lottery "Halloween Spooktacular" closed with total sales of $5000</li>
            </ul>
        </div>

        {/* Graphs (Placeholder for future enhancement) */}
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Sales Analytics (Coming Soon)</h2>
            <p>Graph showing sales over time will be displayed here.</p>
        </div>
        </div>
    );
    };

    export default DashboardPage;
