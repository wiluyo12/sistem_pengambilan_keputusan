import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RankingChart = ({ data }) => {
  const chartData = data.map((operator, index) => ({
    name: operator.name,
    rank: index + 1,
    sawScore: (operator.sawScore * 100).toFixed(1),
    attendance: operator.scores.attendance,
    quality: operator.scores.quality,
    compliance: operator.scores.compliance
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'rank' ? '' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="sawScore" fill="#3b82f6" name="SAW Score" />
          <Bar dataKey="attendance" fill="#10b981" name="Attendance" />
          <Bar dataKey="quality" fill="#8b5cf6" name="Quality" />
          <Bar dataKey="compliance" fill="#f59e0b" name="Compliance" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingChart;