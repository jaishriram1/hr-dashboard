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
  const [buttonClicked, setButtonClicked] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', department: '', rating: 1 });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const usersWithDept = data.users.map((user) => ({
        ...user,
        department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setUsers(usersWithDept);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 border border-blue-500 rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <div className="flex space-x-4">
          <div>
            <h3 className="font-semibold">Department</h3>
            {['Engineering', 'Marketing', 'Sales', 'HR'].map((dept) => (
              <label key={dept} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('department', dept)}
                  checked={filters.department.includes(dept)}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                />
                <span>{dept}</span>
              </label>
            ))}
          </div>
          <div>
            <h3 className="font-semibold">Rating</h3>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('rating', rating.toString())}
                  checked={filters.rating.includes(rating.toString())}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <span>{rating} Stars</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4 bg-blue-500 hover:bg-blue-600">
        Create New User
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Create New User</h2>
        <p>Your user creation form would go here.</p>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Department"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <Button
          onClick={() => {
            setButtonClicked(true);
            setNewUser({
              name: '',
              email: '',
              department: '',
              rating: 1
            });
            // Here you would typically handle form submission, e.g., sending data to an API
            console.log('Form submitted');
            setIsModalOpen(false);
          }}
          className="mt-4"
        >
          Commit
        </Button>
      </Modal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;