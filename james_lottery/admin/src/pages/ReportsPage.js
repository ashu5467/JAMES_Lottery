import React, { useState, useEffect } from 'react';
import { fetchReports } from '../services/reportService';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    getReports();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reports and Analytics</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports available at the moment.</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report._id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Lottery: {report.lotteryName}</p>
                    <p className="text-sm text-gray-500">Total Sales: ${report.totalSales}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-500">Date: {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
