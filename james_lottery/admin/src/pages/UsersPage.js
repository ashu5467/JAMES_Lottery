import React, { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null); // Track if we are editing a user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    registrationDate: '',
    username: '',
    password: '',
    role: 'user', // default role
    status: 'Active',
  });

  // Fetch users from the database when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Set the fetched users to state
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUserId) {
      // Update user
      try {
        const response = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUsers((prev) =>
            prev.map((user) => (user._id === editingUserId ? updatedUser : user))
          );
          setEditingUserId(null);
          setIsCreating(false);
          setNewUser({ name: '', email: '', registrationDate: '', username: '', password: '', role: 'user', status: 'Active' });
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // Create user
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const userData = await response.json();
          setUsers((prev) => [...prev, userData]); // Add the new user to the state
          setNewUser({ name: '', email: '', registrationDate: '', username: '', password: '', role: 'user', status: 'Active' });
          setIsCreating(false);
        } else {
          console.error('Failed to add user');
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userId)); // Remove deleted user from state
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setNewUser(user); // Set form values to selected user's data
    setIsCreating(true); // Show form
    setEditingUserId(user._id); // Track the user being edited
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Quick Actions */}
      <div className="mb-6">
        <button
          onClick={() => {
            setIsCreating(!isCreating);
            setEditingUserId(null); // Reset editing state when adding new user
            setNewUser({ name: '', email: '', registrationDate: '', username: '', password: '', role: 'user', status: 'Active' });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
        >
          {isCreating ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {/* Form for adding/updating user */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editingUserId ? 'Edit User' : 'Add New User'}</h2>

          <label className="block mb-1" htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Enter user name"
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Enter user email"
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="registrationDate">Registration Date:</label>
          <input
            type="date"
            name="registrationDate"
            value={newUser.registrationDate}
            onChange={handleChange}
            required
            className="border rounded p-2 mb-2 w-full"
          />

          <label className="block mb-1" htmlFor="status">Status:</label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleChange}
            className="border rounded p-2 mb-2 w-full"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Banned">Banned</option>
          </select>

          <label className="block mb-1" htmlFor="role">Role:</label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="border rounded p-2 mb-2 w-full"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">
            {editingUserId ? 'Update User' : 'Add User'}
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Users</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Registration Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{new Date(user.registrationDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
