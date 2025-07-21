import { useState, useMemo } from 'react';

export const useSearch = (users) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ department: [], rating: [] });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        (user.firstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.lastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department ?? '').toLowerCase().includes(searchTerm.toLowerCase());

      const departmentMatch =
        filters.department.length === 0 || filters.department.includes(user.department);
      const ratingMatch =
        filters.rating.length === 0 || filters.rating.includes(user.rating.toString());

      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [users, searchTerm, filters]);

  return { searchTerm, setSearchTerm, filters, setFilters, filteredUsers };
};