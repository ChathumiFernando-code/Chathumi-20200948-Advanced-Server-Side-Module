import { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../lib/api';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const studentsPerPage = 5; // Display 10 students per page

  // Fetch students with pagination
  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchStudents(currentPage, studentsPerPage);
      setStudents(data.students);
      setTotalPages(data.totalPages);
    };
    getStudents();
  }, [currentPage]);

  const handleSubmit = async (student) => {
    if (studentToEdit) {
      const updatedStudent = await updateStudent(studentToEdit._id, student);
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
      );
    } else {
      const newStudent = await createStudent(student);
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }
    setStudentToEdit(null);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm onSubmit={handleSubmit} studentToEdit={studentToEdit} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.phone}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
