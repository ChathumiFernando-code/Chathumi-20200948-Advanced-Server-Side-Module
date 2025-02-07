// pages/students.js
import { useEffect, useState } from 'react';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetching data from the backend
    fetch('http://localhost:5001/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h1>List of Students</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
