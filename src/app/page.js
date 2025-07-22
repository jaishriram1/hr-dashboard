'use client';
import { useState, useEffect } from 'react';
import Card from './(components)/Card';
import { useSearch } from '@/hooks/useSearch';
import Modal from './(components)/Modal';
import Button from './(components)/Button';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const { searchTerm, setSearchTerm, filters, setFilters, filteredUsers } = useSearch(users);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '', rating: 1 });

  useEffect(() => {
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
      setLoading(false);
    } else {
      const fetchUsers = async () => {
        const res = await fetch('https://dummyjson.com/users?limit=20');
        const data = await res.json();
        const usersWithDept = data.users.map((user) => ({
          ...user,
          department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        setUsers(usersWithDept);
        localStorage.setItem('users', JSON.stringify(usersWithDept));
        setLoading(false);
      };
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  if (loading) return <p className="text-center text-lg font-semibold animate-pulse">Loading...</p>;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-tr from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 placeholder-gray-500 border border-indigo-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm backdrop-blur-md"
        />

        <div className="flex flex-col sm:flex-row gap-6 md:gap-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">Department</h3>
            {['Engineering', 'Marketing', 'Sales', 'HR'].map((dept) => (
              <label key={dept} className="flex items-center space-x-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('department', dept)}
                  checked={filters.department.includes(dept)}
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-150"
                />
                <span>{dept}</span>
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">Rating</h3>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('rating', rating.toString())}
                  checked={filters.rating.includes(rating.toString())}
                  className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-150"
                />
                <span>{rating} Star{rating > 1 && 's'}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-xl shadow-md transition-all duration-200"
      >
        Create New User
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Create New User</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Department"
            value={newUser.department}
            onChange={e => setNewUser({ ...newUser, department: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newUser.rating}
            min={1}
            max={5}
            onChange={e => setNewUser({ ...newUser, rating: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <Button
          onClick={() => {
            if (!newUser.name || !newUser.email || !newUser.department || newUser.rating < 1 || newUser.rating > 5) {
              alert('Please fill all fields correctly.');
              return;
            }
            setUsers([...users, { ...newUser, id: users.length + 1 }]);
            setNewUser({ name: '', email: '', department: '', rating: 1 });
            setIsModalOpen(false);
          }}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl shadow-sm transition-all duration-200"
        >
          Commit
        </Button>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
