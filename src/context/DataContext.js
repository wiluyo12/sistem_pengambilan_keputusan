import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Evaluation criteria with weights
  const [criteria] = useState([
    { id: 'attendance', name: 'Attendance', weight: 0.3, unit: '%' },
    { id: 'quality', name: 'Quality Accuracy Score', weight: 0.4, unit: '%' },
    { id: 'compliance', name: 'Compliance Score', weight: 0.3, unit: '%' }
  ]);

  // Dummy operator data
  const [operators, setOperators] = useState([
    {
      id: 1,
      name: 'Rio',
      department: 'Injection Molding',
      scores: {
        attendance: 95,
        quality: 88,
        compliance: 92
      }
    },
    {
      id: 2,
      name: 'Kiting',
      department: 'Injection Molding',
      scores: {
        attendance: 98,
        quality: 95,
        compliance: 89
      }
    },
    {
      id: 3,
      name: 'Jangkung',
      department: 'Quality Control',
      scores: {
        attendance: 87,
        quality: 92,
        compliance: 96
      }
    },
    {
      id: 4,
      name: 'Ucup',
      department: 'Assemblyng',
      scores: {
        attendance: 93,
        quality: 90,
        compliance: 94
      }
    },
    {
      id: 5,
      name: 'Bedul',
      department: 'Packaging',
      scores: {
        attendance: 91,
        quality: 85,
        compliance: 88
      }
    },
     {
      id: 6,
      name: 'Acil',
      department: 'Injection Molding',
      scores: {
        attendance: 92,
        quality: 35,
        compliance: 28
      }
    }
  ]);

  // SAW Calculation Function
  const calculateSAW = () => {
    // Find max values for normalization (benefit criteria)
    const maxValues = {
      attendance: Math.max(...operators.map(op => op.scores.attendance)),
      quality: Math.max(...operators.map(op => op.scores.quality)),
      compliance: Math.max(...operators.map(op => op.scores.compliance))
    };

    // Calculate SAW scores
    const results = operators.map(operator => {
      let sawScore = 0;
      
      criteria.forEach(criterion => {
        const normalizedScore = operator.scores[criterion.id] / maxValues[criterion.id];
        sawScore += normalizedScore * criterion.weight;
      });

      return {
        ...operator,
        sawScore: sawScore,
        normalizedScores: {
          attendance: operator.scores.attendance / maxValues.attendance,
          quality: operator.scores.quality / maxValues.quality,
          compliance: operator.scores.compliance / maxValues.compliance
        }
      };
    });

    // Sort by SAW score (descending)
    return results.sort((a, b) => b.sawScore - a.sawScore);
  };

  const addOperator = (operator) => {
    const newOperator = {
      ...operator,
      id: Math.max(...operators.map(op => op.id)) + 1
    };
    setOperators([...operators, newOperator]);
  };

  const updateOperator = (id, updatedOperator) => {
    setOperators(operators.map(op => 
      op.id === id ? { ...updatedOperator, id } : op
    ));
  };

  const deleteOperator = (id) => {
    setOperators(operators.filter(op => op.id !== id));
  };

  const value = {
    criteria,
    operators,
    calculateSAW,
    addOperator,
    updateOperator,
    deleteOperator
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};