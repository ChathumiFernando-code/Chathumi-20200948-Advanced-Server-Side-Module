const API_URL = 'http://localhost:5001/api/students';

export const fetchStudents = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const createStudent = async (student) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
};

export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
