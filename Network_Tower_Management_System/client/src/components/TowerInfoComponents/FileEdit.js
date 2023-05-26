import React, { useState } from 'react';
import axios from 'axios';

const EditForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/api/edit', formData);
    console.log(response);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditForm;