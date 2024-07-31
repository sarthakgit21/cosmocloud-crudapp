import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EmployeeDetails = () => {
  const {emp_id:id} = useParams();
  const params = useParams();

  console.log(params)
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      const myHeaders = new Headers();
      myHeaders.append("environmentId", "66aa422c8a5479d9d20fd27d");
      myHeaders.append("projectId", "66aa422c8a5479d9d20fd27c");
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/user/${id}`, requestOptions);
        if (response.ok) {
          const result = await response.json();
          setEmployee(result);
        } else {
          console.error('Failed to fetch employee data:', await response.text());
          setEmployee(null); 
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setEmployee(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Address:</strong> {employee.address}</p>
      <p><strong>Contacts:</strong> {employee.contacts}</p>
    </div>
  );
};

export default EmployeeDetails;