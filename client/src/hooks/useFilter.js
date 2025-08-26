import { useState, useMemo } from 'react';

const useFilter = (data, filterFields = []) => {
  const [filters, setFilters] = useState({});

  const filteredData = useMemo(() => {
    if (!data || Object.keys(filters).length === 0) return data;

    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        let itemValue = item[key];

        // Handle nested properties (e.g., 'user.name')
        if (key.includes('.')) {
          const keys = key.split('.');
          itemValue = keys.reduce((obj, key) => obj?.[key], item);
        }

        if (itemValue == null) return false;

        // Convert to string for comparison
        const itemStr = itemValue.toString().toLowerCase();
        const filterStr = value.toString().toLowerCase();

        return itemStr.includes(filterStr);
      });
    });
  }, [data, filters]);

  const setFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value);

  return {
    filteredData,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters
  };
};

export default useFilter;