import React, { useState, useEffect } from 'react';
import { fetchReports } from '../../services/reportService';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const data = await fetchReports();
      setReports(data);
    };
    getReports();
  }, []);

  return (
    <div>
      <h2>Sales and Analytics Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            Lottery: {report.lotteryName} - Total Sales: {report.totalSales}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
