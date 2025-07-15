import React from 'react';
import { useData } from '../context/DataContext';
import { Trophy, TrendingUp, Users, Award } from 'lucide-react';
import ProgressBar from './ProgressBar';
import RankingChart from './RankingChart';

const UserDashboard = () => {
  const { criteria, calculateSAW } = useData();
  const rankedOperators = calculateSAW();

  const topPerformer = rankedOperators[0];
  const averageScore = rankedOperators.reduce((sum, op) => sum + op.sawScore, 0) / rankedOperators.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Evaluasi Operator Produksi</h1>
        <p className="mt-2 text-gray-600">
          Evaluasi menggunakan metode Simple Additive Weighting (SAW)
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Operator Terbaik</p>
              <p className="text-lg font-semibold text-gray-900">{topPerformer?.name}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Score Tertinggi</p>
              <p className="text-lg font-semibold text-gray-900">
                {(topPerformer?.sawScore * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Jumlah Operator</p>
              <p className="text-lg font-semibold text-gray-900">{rankedOperators.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Score Rata-rata</p>
              <p className="text-lg font-semibold text-gray-900">
                {(averageScore * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Kriteria dan Bobot Evaluasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="text-center">
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{criterion.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  {(criterion.weight * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Weight</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ranking Table */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rangking Operator</h2>
          <div className="space-y-4">
            {rankedOperators.map((operator, index) => (
              <div
                key={operator.id}
                className={`p-4 rounded-lg border-2 ${
                  index === 0
                    ? 'border-yellow-300 bg-yellow-50'
                    : index === 1
                    ? 'border-gray-300 bg-gray-50'
                    : index === 2
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? 'bg-yellow-400 text-yellow-900'
                          : index === 1
                          ? 'bg-gray-400 text-gray-900'
                          : index === 2
                          ? 'bg-orange-400 text-orange-900'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{operator.name}</p>
                      <p className="text-sm text-gray-600">{operator.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {(operator.sawScore * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">SAW Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Visualization */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Total score</h2>
          <div className="space-y-6">
            {rankedOperators.slice(0, 5).map((operator) => (
              <div key={operator.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{operator.name}</span>
                  <span className="text-sm text-gray-600">
                    {(operator.sawScore * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="space-y-2">
                  {criteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-center">
                      <span className="text-xs text-gray-600 w-20 truncate">
                        {criterion.name}
                      </span>
                      <div className="flex-1 ml-2">
                        <ProgressBar
                          value={operator.scores[criterion.id]}
                          max={100}
                          className="h-2"
                        />
                      </div>
                      <span className="text-xs text-gray-600 ml-2 w-10 text-right">
                        {operator.scores[criterion.id]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Grafik Peforma</h2>
        <RankingChart data={rankedOperators} />
      </div>
    </div>
  );
};

export default UserDashboard;