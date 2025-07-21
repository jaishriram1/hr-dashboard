'use client';

import Card from './(components)/Card';
import Modal from './(components)/Modal';
import Button from './(components)/Button';
import { useEffect, useState } from 'react';
import useSearch from '@/hooks/useSearch';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: '',
    rating: 1,
  });

  const { searchTerm, setSearchTerm, selectedDept, setSelectedDept, selectedRating, setSelectedRating, filteredUsers } = useSearch(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      const enrichedUsers = data.map(user => ({
        ...user,
        department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
        rating: Math.ceil(Math.random() * 5),
      }));
      setUsers(enrichedUsers);
    };
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    if (!newUser.name || !newUser.email || !newUser.department || !newUser.rating) {
      alert('Please fill all fields!');
      return;
    }

    const userToAdd = {
      id: users.length + 1,
      ...newUser,
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: '', email: '', department: '', rating: 1 });
    setIsModalOpen(false);
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">HR Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="col-span-2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Create New User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="space-y-1">
          <label className="font-semibold">Department</label>
          {['Engineering', 'Marketing', 'Sales', 'HR'].map((dept) => (
            <div key={dept}>
              <input
                type="radio"
                name="dept"
                checked={selectedDept === dept}
                onChange={() => setSelectedDept(dept)}
              />{' '}
              {dept}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <label className="font-semibold">Rating</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star}>
              <input
                type="radio"
                name="rating"
                checked={selectedRating === star}
                onChange={() => setSelectedRating(star)}
              />{' '}
              {star} Stars
            </div>
          ))}
        </div>
      </div>

      {/* Users */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New User">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            className="w-full px-4 py-2 border rounded"
            value={newUser.department}
            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            className="w-full px-4 py-2 border rounded"
            min={1}
            max={5}
            value={newUser.rating}
            onChange={(e) => setNewUser({ ...newUser, rating: parseInt(e.target.value) })}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default HomePage;
