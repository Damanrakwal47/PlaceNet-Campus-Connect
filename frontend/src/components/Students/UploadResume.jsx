import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from '../../config/config';

const UploadResume = ({ fetchCurrentUserData }) => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: '', role: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCurrentUser({ id: res.data.id, role: res.data.role }))
      .catch(err => console.error("UploadResume.jsx =>", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    // Accept only PDF files on frontend as well
    if (file.type !== 'application/pdf') {
      setUploadStatus('Only PDF files are allowed');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('userId', currentUser.id);

    try {
      const response = await axios.post(`${BASE_URL}/student/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (fetchCurrentUserData) fetchCurrentUserData();
      setUploadStatus('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading the resume:', error);
      setUploadStatus('Error uploading the resume');
    }
  };

  return (
    <FloatingLabel controlId="floatingResume" label="Update Resume">
      <Form.Control
        type="file"
        accept='.pdf'
        placeholder="Upload Resume"
        name='resume'
        onChange={handleSubmit}
      />
      {uploadStatus && <p className='text-sm text-gray-300 mt-1'>{uploadStatus}</p>}
    </FloatingLabel>
  );
};

export default UploadResume;
