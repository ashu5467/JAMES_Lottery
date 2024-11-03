import React, { useState, useEffect } from 'react';

const ResultsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [results, setResults] = useState([]); // Store all results
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch all results
  const fetchAllResults = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/results');
      console.log('Response status for all results:', response.status);

      if (!response.ok) {
        console.warn('Failed to fetch results:', response.statusText);
        setError('Failed to fetch results.');
        return;
      }

      const data = await response.json();
      console.log('Fetched all results:', data);
      setResults(data); // Set all results
    } catch (error) {
      console.error('Error occurred while fetching all results:', error);
      setError('Failed to fetch results.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch all results when the component mounts
  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchResultByDate = async (date) => {
    setLoading(true); // Start loading
    try {
      console.log('Fetching result for date:', date);
      setError('');
      const response = await fetch(`http://localhost:5000/api/results/date?date=${date}`);
      console.log('Response status for date:', response.status);
  
      if (!response.ok) {
        console.warn('Failed to fetch result:', response.statusText);
        setError('Failed to fetch result.');
        return;
      }
  
      const data = await response.json();
      console.log('Fetched data for date:', data);
  
      if (data && data.date && data.image) {
        setResults([data]); // Set result based on date selection
      } else {
        console.warn('Fetched data does not have expected structure:', data);
        setError('No result found for this date.');
      }
    } catch (error) {
      console.error('Error occurred while fetching result:', error);
      setError('Failed to fetch result.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log('Selected date changed to:', newDate);
    setSelectedDate(newDate);
    fetchResultByDate(newDate); // Fetch results based on the selected date
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Select a date to view results:</h2>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleDateChange} 
        style={styles.dateInput}
      />
      
      {/* Loading state */}
      {loading ? (
        <div style={styles.loaderContainer}>
          <div style={styles.loader}></div>
          <span style={styles.loadingText}>Loading...</span>
        </div>
      ) : (
        <>
          {/* Display all results */}
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result._id} style={styles.resultCard}>
                <h3 style={styles.resultDate}>{new Date(result.date).toLocaleDateString()}</h3>
                <img 
                  src={`http://localhost:5000/${result.image}`} 
                  alt="Result Image" 
                  style={styles.resultImage}
                />
              </div>
            ))
          ) : (
            error && <p style={styles.errorText}>{error}</p>
          )}
        </>
      )}
      
      {/* CSS Styles */}
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #007bff; /* Customize color here */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc', // Light gray background
    padding: '2rem',
    minHeight: '100vh',
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  dateInput: {
    padding: '0.5rem',
    border: '1px solid #cbd5e0',
    borderRadius: '0.375rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '1rem',
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  loader: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#007bff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginLeft: '0.5rem',
    fontSize: '1.125rem',
  },
  resultCard: {
    marginTop: '1rem',
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
    },
  },
  resultDate: {
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  resultImage: {
    marginTop: '0.5rem',
    maxWidth: '100%',
    borderRadius: '0.375rem',
    transition: 'transform 0.3s',
  },
  errorText: {
    color: '#f56565', // Red color for error messages
    marginTop: '1rem',
  },
};

export default ResultsPage;
