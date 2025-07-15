import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import UserDashboard from "./UserDashboard";

const AdminDashboard = () => {
  const { operators, addOperator, updateOperator, deleteOperator } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingOperator, setEditingOperator] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    scores: {
      attendance: "",
      quality: "",
      compliance: "",
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      scores: {
        attendance: "",
        quality: "",
        compliance: "",
      },
    });
    setEditingOperator(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const operatorData = {
      ...formData,
      scores: {
        attendance: parseFloat(formData.scores.attendance),
        quality: parseFloat(formData.scores.quality),
        compliance: parseFloat(formData.scores.compliance),
      },
    };

    if (editingOperator) {
      updateOperator(editingOperator.id, operatorData);
    } else {
      addOperator(operatorData);
    }

    resetForm();
  };

  const handleEdit = (operator) => {
    setFormData({
      name: operator.name,
      department: operator.department,
      scores: {
        attendance: operator.scores.attendance.toString(),
        quality: operator.scores.quality.toString(),
        compliance: operator.scores.compliance.toString(),
      },
    });
    setEditingOperator(operator);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus operator ini")) {
      deleteOperator(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Panel Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="mt-2 text-gray-600">Kelola data operator dan lihat hasil evaluasi</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Operator
          </button>
        </div>
      </div>

      {/* Operator Management */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Operator</h2>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{editingOperator ? "Edit Operator" : "Add New Operator"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" required className="input-field" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    className="input-field"
                    value={formData.scores.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scores: { ...formData.scores, attendance: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quality Accuracy (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    className="input-field"
                    value={formData.scores.quality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scores: { ...formData.scores, quality: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compliance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    className="input-field"
                    value={formData.scores.compliance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scores: { ...formData.scores, compliance: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  {editingOperator ? "Update" : "Add"} Operator
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex items-center">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Operators Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {operators.map((operator) => (
                <tr key={operator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{operator.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{operator.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{operator.scores.attendance}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{operator.scores.quality}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{operator.scores.compliance}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(operator)} className="text-primary-600 hover:text-primary-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(operator.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard View */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Dashboard</h2>
        <UserDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
