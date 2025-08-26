import { useState, useMemo } from 'react';

const useSort = (data, initialSortBy = '', initialSortOrder = 'ASC') => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const sortedData = useMemo(() => {
    if (!sortBy || !data) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle nested properties (e.g., 'user.name')
      if (sortBy.includes('.')) {
        const keys = sortBy.split('.');
        aValue = keys.reduce((obj, key) => obj?.[key], a);
        bValue = keys.reduce((obj, key) => obj?.[key], b);
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === 'ASC' ? 1 : -1;
      if (bValue == null) return sortOrder === 'ASC' ? -1 : 1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === 'ASC' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'ASC' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'ASC' ? '↑' : '↓';
  };

  return {
    sortedData,
    sortBy,
    sortOrder,
    handleSort,
    getSortIcon,
    setSortBy,
    setSortOrder
  };
};

export default useSort;