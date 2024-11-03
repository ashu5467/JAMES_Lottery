import React, { useState, useEffect } from 'react';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({ date: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentResultId, setCurrentResultId] = useState(null);

  // Fetch results on component mount
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/results');
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchResults();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewResult((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('date', newResult.date);
    if (newResult.image) {
      formData.append('image', newResult.image); // Append the image file
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:5000/api/results/${currentResultId}`
      : 'http://localhost:5000/api/results';

    try {
      const response = await fetch(url, {
        method,
        body: formData, // Send form data
      });

      if (response.ok) {
        const updatedResult = await response.json();
        setResults((prev) =>
          isEditing
            ? prev.map((result) => (result._id === currentResultId ? updatedResult : result))
            : [...prev, updatedResult]
        );
        setNewResult({ date: '', image: null });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (result) => {
    setNewResult(result);
    setIsEditing(true);
    setCurrentResultId(result._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/results/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setResults((prev) => prev.filter((result) => result._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Results Management</h1>

      {/* New Result Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6" encType="multipart/form-data">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={newResult.date}
          onChange={handleChange}
          className="border rounded p-2 mb-2 w-full"
          required
        />

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="border rounded p-2 mb-2 w-full"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 mt-4">
          {isEditing ? 'Update Result' : 'Add Result'}
        </button>
      </form>

      {/* Results Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{new Date(result.date).toLocaleDateString()}</td>
                <td>
                  <img src={`http://localhost:5000/${result.image}`} alt="Lottery Result" className="w-20 h-20" />
                </td>
                <td>
                  <button onClick={() => handleEdit(result)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(result._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg">
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

export default ResultsPage;
