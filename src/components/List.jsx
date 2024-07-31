import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const myHeaders = new Headers();
      myHeaders.append("environmentId", "66aa422c8a5479d9d20fd27d");
      myHeaders.append("projectId", "66aa422c8a5479d9d20fd27c");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch("https://free-ap-south-1.cosmocloud.io/development/api/user?offset=0&limit=10", requestOptions);
        const result = await response.json();
        const final_array=result.data;
        
        console.log('Fetched employees:', final_array);

        if (Array.isArray(final_array)) {
          setEmployees(final_array);
        } else {
          console.error('Expected an array but received:', result);
          setEmployees([]); 
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployees([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("environmentId", "66aa422c8a5479d9d20fd27d");
    myHeaders.append("projectId", "66aa422c8a5479d9d20fd27c");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({});

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/user/${id}`, requestOptions);
      const result = await response.text();
      console.log('Delete response:', result);

      if (response.ok) {
        setEmployees(employees.filter(emp => emp._id !== id));
      } else {
        console.error('Failed to delete employee:', result);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="employees-container">
      <h1 className="title">Employees Details</h1>
      <Link to="/add-employee" className="add-employee-btn">Add Employee</Link>
      {employees.length === 0 ? (
        <p className="no-employees">No Employees in the system</p>
      ) : (
        <ul className="employees-list">
          {employees.map(employee => (
            <li key={employee._id} className="employee-item">
              <span className="employee-info">
                {employee.name}
              </span>
              <Link to={`/employee/${employee._id}`} className="view-details">View Details</Link>
              <button className="delete" onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeesList;
