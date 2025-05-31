import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from '../Toast';
import ModalBox from '../Modal';
import { BASE_URL } from '../../config/config';

function PostJob() {
  document.title = 'PCC | Post Job';
  const navigate = useNavigate();

  const { jobId } = useParams();
  const editor = useRef(null);

  const [data, setData] = useState({
    eligibility: {
      cgpa: '',
      year: '',
      gap: '',
      backlogs: '',
      tenthPercentage: '',
      twelfthPercentage: ''
    }
  });

  const [companys, setCompanys] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.company || !data?.jobTitle || !data?.salary || !data?.applicationDeadline || !data?.jobDescription || !data?.eligibility || !data?.howToApply) {
      setToastMessage("All Fields Required!");
      setShowToast(true);
      return;
    }
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/tpo/post-job`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response?.data?.msg) {
        setToastMessage(response.data.msg);
        setShowToast(true);

        const newDataToPass = {
          showToastPass: true,
          toastMessagePass: response?.data?.msg,
        };
        navigate('../tpo/job-listings', { state: newDataToPass });
      }
    } catch (error) {
      if (error.response) {
        if (error?.response.data?.msg) setToastMessage(error.response.data.msg);
        else setToastMessage(error.message);

        setShowToast(true);
      }
      console.log("PostJob error while fetching => ", error);
    }
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      eligibility: { ...data.eligibility, [name]: value },
    });
  };

  const fetchJobDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tpo/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      if (error.response) {
        if (error?.response.data?.msg) setToastMessage(error.response.data.msg);
        else setToastMessage(error.message);
        setShowToast(true);

        if (error?.response?.data?.msg === "job data not found") navigate('../404');
      }
      console.log("Error while fetching details => ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/company/company-detail`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCompanys(response.data.companys);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    }
  };

  useEffect(() => {
    fetchJobDetail();
    fetchCompanys();
    if (!jobId) setLoading(false);
  }, []);

  const formatDate = (isoString) => {
    if (!isoString || isoString === "undefined") return "";
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

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
          <div>
            <form onSubmit={handleSubmit}>
              <div className="my-8 text-base backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 max-sm:text-sm max-md:p-3">
                <div className="grid grid-cols-1 gap-2">
                  <FloatingLabel controlId="floatingSelectDifficulty" label="Select Company Name">
                    <Form.Select
                      aria-label="Floating label select difficulty"
                      name="company"
                      value={data?.company || ''}
                      onChange={(e) => setData({ ...data, company: e.target.value })}
                    >
                      <option disabled value="">Select Company Name</option>
                      {companys?.map((company, index) => (
                        <option key={index} value={company._id}>{company.companyName}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>

              <div className="my-8 text-base backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400 p-6 max-sm:text-sm max-md:p-3">
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
                  <FloatingLabel controlId="floatingJobTitle" label="Job Title">
                    <Form.Control
                      type="text"
                      placeholder="Job Title"
                      name="jobTitle"
                      value={data?.jobTitle || ''}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingSalary" label="Salary (In LPA)">
                    <Form.Control
                      type="text"
                      placeholder="Salary"
                      name="salary"
                      value={data?.salary || ''}
                      onChange={(e) => {
                        if (!isNaN(e.target.value) && /^[0-9]*[.,]?[0-9]*$/.test(e.target.value)) {
                          handleDataChange(e);
                        }
                      }}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingDeadlineDate" label="Deadline Date">
                    <Form.Control
                      type="date"
                      placeholder="Deadline Date"
                      name="applicationDeadline"
                      value={formatDate(data?.applicationDeadline) || ''}
                      onChange={handleDataChange}
                    />
                  </FloatingLabel>
                </div>

                <div className="py-6">
                  <label>Enter Job Description</label>
                  <JoditEditor
                    ref={editor}
                    tabIndex={1}
                    value={data?.jobDescription || ''}
                    onChange={(e) => setData({ ...data, jobDescription: e })}
                  />
                </div>

                <div className="py-6">
                  <label>Enter Eligibility</label>
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabel controlId="floatingCgpa" label="CGPA">
                      <Form.Control
                        type="number"
                        placeholder="CGPA"
                        name="cgpa"
                        value={data?.eligibility?.cgpa || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingYear" label="Year">
                      <Form.Control
                        type="number"
                        placeholder="Year"
                        name="year"
                        value={data?.eligibility?.year || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingGap" label="Gap">
                      <Form.Control
                        type="number"
                        placeholder="Gap"
                        name="gap"
                        value={data?.eligibility?.gap || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingBacklogs" label="Backlogs">
                      <Form.Control
                        type="number"
                        placeholder="Backlogs"
                        name="backlogs"
                        value={data?.eligibility?.backlogs || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTenthPercentage" label="10th Percentage">
                      <Form.Control
                        type="number"
                        placeholder="10th Percentage"
                        name="tenthPercentage"
                        value={data?.eligibility?.tenthPercentage || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTwelfthPercentage" label="12th Percentage">
                      <Form.Control
                        type="number"
                        placeholder="12th Percentage"
                        name="twelfthPercentage"
                        value={data?.eligibility?.twelfthPercentage || ''}
                        onChange={handleEligibilityChange}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="py-6">
                  <label>Enter Process To Apply</label>
                  <JoditEditor
                    ref={editor}
                    tabIndex={3}
                    value={data?.howToApply || ''}
                    onChange={(e) => setData({ ...data, howToApply: e })}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Button variant="primary" type="submit" size="lg">POST</Button>
              </div>
            </form>
          </div>
        </>
      )}

      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Do you want to post job for ${data?.jobTitle}?`}
        btn={"Post"}
        confirmAction={confirmSubmit}
      />
    </>
  );
}

export default PostJob;
