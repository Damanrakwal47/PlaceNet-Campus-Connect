import React, { useEffect, useState, useCallback } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Toast from './Toast';
import Button from 'react-bootstrap/Button';
import ModalBox from './Modal';
import { BASE_URL } from '../config/config';

function ViewJobPost() {
  document.title = 'PCC | View Job Post';
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState('');

  const closeModal = () => setShowModal(false);

  // Fetch current user with token
  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setToastMessage('Please login first');
      setShowToast(true);
      return null;
    }

    try {
      const res = await axios.get(`${BASE_URL}/user/detail`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCurrentUser({
        id: res.data.id,
        email: res.data.email,
        role: res.data.role,
      });
      return res.data;
    } catch (err) {
      console.log("Error fetching user:", err);
      setToastMessage(err.response?.data?.msg || 'Error fetching user details');
      setShowToast(true);
      return null;
    }
  }, []);

  // Fetch job details
  const fetchJobDetail = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/tpo/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching job:", error);
      setToastMessage(error.response?.data?.msg || 'Error fetching job details');
      setShowToast(true);
      if (error.response?.data?.msg === "job data not found") {
        navigate('/404');
      }
      return null;
    }
  }, [jobId, navigate]);

  // Fetch company data
  const fetchCompanyData = useCallback(async (companyId) => {
    if (!companyId) {
      console.log("No company ID provided");
      return null;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/company/company-data`, {
        params: { companyId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompany(response.data.company);
      return response.data.company;
    } catch (error) {
      console.log("Error fetching company:", error);
      setToastMessage(error.response?.data?.msg || 'Error fetching company details');
      setShowToast(true);
      return null;
    }
  }, []);

  // Check if applied
  const fetchApplied = useCallback(async (userId) => {
    if (!userId || !jobId) return false;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/check-applied/${jobId}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplied(response?.data?.applied || false);
      return response?.data?.applied;
    } catch (error) {
      console.log("Error checking application:", error);
      setToastMessage(error.response?.data?.msg || 'Error checking application status');
      setShowToast(true);
      return false;
    }
  }, [jobId]);

  // Handle apply button click
  const handleApply = () => {
    if (!currentUser) {
      setToastMessage('Please login first');
      setShowToast(true);
      return;
    }
    setModalBody("Do you really want to apply for this job? Make sure your profile is updated to increase placement chances.");
    setShowModal(true);
  };

  // Confirm apply action
  const handleConfirmApply = async () => {
    if (!currentUser?.id) {
      setToastMessage('Please login first');
      setShowToast(true);
      setShowModal(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/student/job/${jobId}/${currentUser.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setToastMessage(response?.data?.msg || 'Application submitted successfully');
      setShowToast(true);
      setShowModal(false);
      await fetchApplied(currentUser.id);
    } catch (error) {
      console.log("Error applying:", error);
      setToastMessage(error.response?.data?.msg || 'Error submitting application');
      setShowToast(true);
      setShowModal(false);
    }
  };

  // Main data loading effect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 1. First get current user
        const user = await fetchCurrentUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // 2. Then get job details
        const jobData = await fetchJobDetail();
        if (!jobData) {
          setLoading(false);
          return;
        }

        // 3. Then get company data if job has company ID
        if (jobData.company) {
          await fetchCompanyData(jobData.company);
        }

        // 4. Check if user has applied (if student)
        if (user.role === 'student') {
          await fetchApplied(user.id);
        }

        // 5. Get applicants if TPO/admin
        if (user.role !== 'student') {
          // Add your fetchApplicant logic here if needed
        }
      } catch (error) {
        console.error("Error during data loading:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [jobId, fetchCurrentUser, fetchJobDetail, fetchCompanyData, fetchApplied]);

  // Render company details section
  const renderCompanyDetails = () => {
    if (!company) {
      return <div>No company data available</div>;
    }

    return (
      <div>
        <h3 className='text-3xl text-center border-b-2 py-4 mb-4'>
          {company.companyName}
        </h3>
        <div className="border-b-2 px-2 pb-4 text-gray-500 text-justify leading-5">
          {company.companyDescription}
        </div>
        <div className="flex justify-between p-2 border-b-2 my-2">
          <span>Website</span>
          <span className='bg-blue-500 py-1 px-2 text-white rounded cursor-pointer'>
            <a
              href={company.companyWebsite.startsWith('http') ? company.companyWebsite : `https://${company.companyWebsite}`}
              target='_blank'
              rel="noopener noreferrer"
              className='no-underline text-white'
            >
              {company.companyWebsite}
            </a>
          </span>
        </div>
        <div className="flex justify-between p-2 border-b-2 my-2">
          <span>Job Locations</span>
          <div className="flex gap-2">
            {company.companyLocation?.split(',').map((location, index) => (
              <span key={index} className='bg-blue-500 py-1 px-2 text-white rounded'>
                {location.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between p-2 border-b-2 my-2">
          <span>Difficulty Level</span>
          {company.companyDifficulty === "Easy" && (
            <span className='bg-green-500 py-1 px-2 text-white rounded'>
              {company.companyDifficulty}
            </span>
          )}
          {company.companyDifficulty === "Moderate" && (
            <span className='bg-orange-500 py-1 px-2 text-white rounded'>
              {company.companyDifficulty}
            </span>
          )}
          {company.companyDifficulty === "Hard" && (
            <span className='bg-red-500 py-1 px-2 text-white rounded'>
              {company.companyDifficulty}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Render job details section
  const renderJobDetails = () => (
    <div className="flex flex-col gap-4">
      {/* Job Title */}
      <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
        <span className='text-xl text-blue-500 py-2 border-b-2'>Job Title</span>
        <span className='py-3'>{data?.jobTitle || 'Not specified'}</span>
      </div>

      {/* Job Profile */}
      <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
        <span className='text-xl text-blue-500 py-2 border-b-2'>Job Profile</span>
        <div className='py-3' dangerouslySetInnerHTML={{ 
          __html: data?.jobDescription || 'No job description provided' 
        }} />
      </div>

      {/* Eligibility Criteria */}
      <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
  <span className='text-xl text-blue-500 py-2 border-b-2'>Eligibility</span>
  <div className='py-3'>
    {data?.eligibility ? (
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        <li><strong>CGPA:</strong> {data.eligibility.cgpa}</li>
        <li><strong>Passing Year:</strong> {data.eligibility.year}</li>
        <li><strong>Gap Allowed:</strong> {data.eligibility.gap} years</li>
        <li><strong>Backlogs Allowed:</strong> {data.eligibility.backlogs}</li>
        <li><strong>10th %:</strong> {data.eligibility.tenthPercentage}%</li>
        <li><strong>12th %:</strong> {data.eligibility.twelfthPercentage}%</li>
      </ul>
    ) : (
      <p>No eligibility criteria provided</p>
    )}
  </div>
</div>


      {/* Salary */}
      <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
        <span className='text-xl text-blue-500 py-2 border-b-2'>Annual CTC</span>
        <span className='py-3'>
          {data?.salary ? `${data.salary} LPA` : 'Not specified'}
        </span>
      </div>

      {/* Skills Required */}
      {data?.skillsRequired && (
        <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
          <span className='text-xl text-blue-500 py-2 border-b-2'>Skills Required</span>
          <div className='py-3 flex flex-wrap gap-2'>
            {data.skillsRequired.split(',').map((skill, index) => (
              <span key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Location */}
      {data?.jobLocation && (
        <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
          <span className='text-xl text-blue-500 py-2 border-b-2'>Job Location</span>
          <div className='py-3 flex flex-wrap gap-2'>
            {data.jobLocation.split(',').map((location, index) => (
              <span key={index} className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>
                {location.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Application Deadline */}
      <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
        <span className='text-xl text-blue-500 py-2 border-b-2'>Last Date of Application</span>
        <span className='py-3'>
          {data?.applicationDeadline 
            ? new Date(data.applicationDeadline).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            : 'Not specified'}
        </span>
      </div>

      {/* How to Apply (visible if applied or not student) */}
      {(applied === true || currentUser?.role !== 'student') && data?.howToApply && (
        <div className="flex flex-col backdrop-blur-md bg-white/30 border border-white/20 rounded-lg px-2 shadow-sm shadow-red-400">
          <span className='text-xl text-blue-500 py-2 border-b-2'>How to Apply?</span>
          <div className='py-3' dangerouslySetInnerHTML={{ __html: data.howToApply }} />
        </div>
      )}

      {/* Apply Button (for students) */}
      {currentUser?.role === 'student' && (
        <div className="flex justify-center">
          {applied ? (
            <Link to={`/student/status/${jobId}`}>
              <Button variant="warning">
                <i className="fa-solid fa-check px-2" />
                Update Status
              </Button>
            </Link>
          ) : (
            <Button 
              variant="warning" 
              onClick={handleApply}
              disabled={!currentUser}
            >
              <i className="fa-solid fa-check px-2" />
              Apply Now
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      {loading ? (
        <div className="flex justify-center h-72 items-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 my-6 text-base max-sm:text-sm max-sm:grid-cols-1">
            {/* Company Details Column */}
            <div className="flex flex-col grid-flow-row-dense gap-2">
              <Accordion defaultActiveKey={['0']} alwaysOpen className='shadow rounded'>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Company Details</Accordion.Header>
                  <Accordion.Body>
                    {renderCompanyDetails()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {/* Job Details Column */}
            <div className="">
              <Accordion defaultActiveKey={['1']} alwaysOpen className='shadow rounded'>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Job Details</Accordion.Header>
                  <Accordion.Body>
                    {renderJobDetails()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </>
      )}

      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={modalBody}
        btn={"Apply"}
        confirmAction={handleConfirmApply}
      />
    </>
  );
}

export default ViewJobPost;