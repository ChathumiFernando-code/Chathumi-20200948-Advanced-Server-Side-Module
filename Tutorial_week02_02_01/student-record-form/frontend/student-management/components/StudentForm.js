import { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, studentToEdit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setAge(studentToEdit.age);
      setPhone(studentToEdit.phone);
    }
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, phone });
    setName('');
    setAge('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{studentToEdit ? 'Edit Student' : 'Add Student'}</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">{studentToEdit ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default StudentForm;
