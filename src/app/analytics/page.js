'use client';

import { useEffect, useState } from 'react';
import Chart from '../(components)/Chart';

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const usersWithDept = data.users.map((user) => ({
        ...user,
        department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      const departments = ['Engineering', 'Marketing', 'Sales', 'HR'];
      const avgRatings = departments.map((dept) => {
        const deptUsers = usersWithDept.filter((user) => user.department === dept);
        const totalRating = deptUsers.reduce((sum, user) => sum + user.rating, 0);
        return deptUsers.length > 0 ? totalRating / deptUsers.length : 0;
      });

      setChartData({
        labels: departments,
        datasets: [
          {
            label: 'Average Rating',
            data: avgRatings,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      });
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Analytics</h1>
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;