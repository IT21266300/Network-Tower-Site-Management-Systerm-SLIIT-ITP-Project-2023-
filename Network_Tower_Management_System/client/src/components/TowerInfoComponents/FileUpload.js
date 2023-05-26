import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';



const UploadForm = () => {
  const location = useLocation();
const { tabData, result, data } = location.state;
  const [file, setFile] = useState(null);
  const [siteName, setSiteName] = useState('');
  const [siteId, setSiteId] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (data) {
      setSiteId(data.siteId);
      setSiteName(data.siteName);
    }
  }, [data]);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        '/api/permission/add',
        {
          siteName,
          siteId,
          file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('New data has been created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;