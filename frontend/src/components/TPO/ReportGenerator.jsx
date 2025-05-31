// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '../../config/config';
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// // PDF Styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     borderBottom: '1 solid #000',
//     paddingBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   date: {
//     fontSize: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   statCard: {
//     width: '24%',
//     padding: 10,
//     border: '1 solid #ddd',
//     borderRadius: 5,
//     textAlign: 'center',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f5f5f5',
//     padding: 5,
//     borderBottom: '1 solid #ddd',
//     fontWeight: 'bold',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 5,
//     borderBottom: '1 solid #eee',
//   },
//   col1: { width: '5%' },
//   col2: { width: '10%' },
//   col3: { width: '15%' },
//   col4: { width: '10%' },
//   col5: { width: '10%' },
//   col6: { width: '10%' },
//   col7: { width: '15%', textAlign: 'right' },
//   col8: { width: '25%' },
//   placedBadge: {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '2 5',
//     borderRadius: 3,
//   },
//   unplacedBadge: {
//     backgroundColor: '#ffc107',
//     color: 'black',
//     padding: '2 5',
//     borderRadius: 3,
//   },
// });

// // PDF Document Component
// const ReportPDF = ({ students, stats, filters }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Student Placement Report</Text>
//         <Text style={styles.date}>
//           Generated on: {new Date().toLocaleDateString()}
//         </Text>
//       </View>

//       {Object.values(filters).some(Boolean) && (
//         <View style={{ marginBottom: 10 }}>
//           <Text style={{ marginBottom: 5 }}>Filters Applied:</Text>
//           <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
//             {filters.department && (
//               <Text>Department: {filters.department}</Text>
//             )}
//             {filters.status && (
//               <Text>Status: {filters.status === 'placed' ? 'Placed' : 'Unplaced'}</Text>
//             )}
//             {filters.batchYear && (
//               <Text>Batch: {filters.batchYear}</Text>
//             )}
//             {filters.sortPackage && (
//               <Text>Sort: {filters.sortPackage === 'asc' ? 'Low to High' : 'High to Low'}</Text>
//             )}
//           </View>
//         </View>
//       )}

//       <View style={styles.statsContainer}>
//         <View style={styles.statCard}>
//           <Text>Total Students</Text>
//           <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.total}</Text>
//         </View>
//         <View style={[styles.statCard, { backgroundColor: '#e8f5e9' }]}>
//           <Text>Placed</Text>
//           <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.placed}</Text>
//           <Text style={{ fontSize: 10 }}>{stats.placementPercentage}% placement rate</Text>
//         </View>
//         <View style={[styles.statCard, { backgroundColor: '#fff8e1' }]}>
//           <Text>Unplaced</Text>
//           <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.unplaced}</Text>
//           <Text style={{ fontSize: 10 }}>{(100 - stats.placementPercentage).toFixed(2)}% unplaced</Text>
//         </View>
//         <View style={[styles.statCard, { backgroundColor: '#e3f2fd' }]}>
//           <Text>Avg Package</Text>
//           <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.avgPackage} LPA</Text>
//           <Text style={{ fontSize: 10 }}>Average CTC</Text>
//         </View>
//       </View>

//       <View style={styles.tableHeader}>
//         <Text style={styles.col1}>#</Text>
//         <Text style={styles.col2}>Roll No.</Text>
//         <Text style={styles.col3}>Name</Text>
//         <Text style={styles.col4}>Dept</Text>
//         <Text style={styles.col5}>Batch</Text>
//         <Text style={styles.col6}>Status</Text>
//         <Text style={styles.col7}>Package</Text>
//         <Text style={styles.col8}>Company</Text>
//       </View>

//       {students.length > 0 ? (
//         students.map((student, index) => {
//           const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
//           return (
//             <View key={student._id || index} style={styles.tableRow}>
//               <Text style={styles.col1}>{index + 1}</Text>
//               <Text style={styles.col2}>{student.studentProfile?.rollNumber || 'N/A'}</Text>
//               <Text style={styles.col3}>{`${student.first_name} ${student.last_name}`}</Text>
//               <Text style={styles.col4}>{student.studentProfile?.department || 'N/A'}</Text>
//               <Text style={styles.col5}>{student.studentProfile?.addmissionYear || 'N/A'}</Text>
//               <Text style={styles.col6}>
//                 <Text style={hiredJob ? styles.placedBadge : styles.unplacedBadge}>
//                   {hiredJob ? 'placed' : 'unplaced'}
//                 </Text>
//               </Text>
//               <Text style={styles.col7}>
//                 {hiredJob ? (hiredJob.package?.toFixed(2) || 'N/A') : '-'}
//               </Text>
//               <Text style={styles.col8}>
//                 {hiredJob?.jobId?.company?.companyName || '-'}
//               </Text>
//             </View>
//           );
//         })
//       ) : (
//         <View style={{ padding: 20, textAlign: 'center' }}>
//           <Text>No students found matching the criteria</Text>
//         </View>
//       )}

//       <View style={{ marginTop: 20, fontSize: 8, textAlign: 'center' }}>
//         <Text>Generated by Placement Portal • {new Date().toLocaleString()}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const ReportGenerator = () => {
//   const [filters, setFilters] = useState({
//     department: '',
//     status: '',
//     sortPackage: '',
//     batchYear: ''
//   });
//   const [students, setStudents] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [batchYears, setBatchYears] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [expandedFilters, setExpandedFilters] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDepartments();
//     generateBatchYears();
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchStudents();
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [filters]);

//   const fetchDepartments = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${BASE_URL}/regen/departments`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setDepartments(response.data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       setError("Failed to fetch departments");
//       setDepartments(['Computer', 'Civil', 'ECS', 'AIDS', 'Mechanical']);
//     }
//   };

//   const generateBatchYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = Array.from({length: 5}, (_, i) => currentYear - i);
//     setBatchYears(years);
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('token');
//       const queryParams = new URLSearchParams();

//       if (filters.department) queryParams.append('department', filters.department);
//       if (filters.status) queryParams.append('status', filters.status);
//       if (filters.sortPackage) queryParams.append('sortPackage', filters.sortPackage);
//       if (filters.batchYear) queryParams.append('batchYear', filters.batchYear);

//       const response = await axios.get(`${BASE_URL}/regen/students?${queryParams.toString()}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setStudents(response.data.students);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setError(error.response?.data?.message || "Failed to fetch student data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       department: '',
//       status: '',
//       sortPackage: '',
//       batchYear: ''
//     });
//   };

//   const getStats = () => {
//     const total = students.length;
//     const placed = students.filter(student => 
//       student.studentProfile?.appliedJobs?.some(job => job.status === 'hired')
//     ).length;
//     const unplaced = total - placed;
    
//     const placedStudents = students.filter(student => 
//       student.studentProfile?.appliedJobs?.some(job => job.status === 'hired')
//     );
    
//     const avgPackage = placed > 0
//       ? placedStudents.reduce((sum, student) => {
//           const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
//           return sum + (hiredJob?.package || hiredJob?.jobId?.salary || 0);
//         }, 0) / placed
//       : 0;

//     return { 
//       total, 
//       placed, 
//       unplaced, 
//       avgPackage: avgPackage.toFixed(2),
//       placementPercentage: total > 0 ? ((placed / total) * 100).toFixed(2) : 0
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="container-fluid p-4">
//       <div className="card shadow-sm">
//         <div className="card-header bg-primary text-white">
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h3 className="card-title mb-0">
//                 <i className="fas fa-chart-line me-2"></i>
//                 Student Placement Analytics
//               </h3>
//               <small className="text-white-50">Comprehensive placement statistics and reports</small>
//             </div>
//             <div className="d-flex gap-2">
//               <PDFDownloadLink
//                 document={<ReportPDF students={students} stats={stats} filters={filters} />}
//                 fileName={`placement-report-${new Date().toISOString().slice(0,10)}.pdf`}
//                 className="btn btn-light btn-sm"
//               >
//                 {({ loading: pdfLoading }) => (
//                   <>
//                     <i className="fas fa-file-pdf me-1"></i>
//                     {pdfLoading ? 'Preparing PDF...' : 'Export PDF'}
//                   </>
//                 )}
//               </PDFDownloadLink>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="btn btn-light btn-sm"
//               >
//                 <i className="fas fa-arrow-left me-1"></i> Back
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="card-body">
//           <div className="mb-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="mb-0">
//                 <i className="fas fa-filter me-2 text-primary"></i>
//                 Filters
//               </h5>
//               <button 
//                 className="btn btn-sm btn-outline-primary"
//                 onClick={() => setExpandedFilters(!expandedFilters)}
//               >
//                 {expandedFilters ? (
//                   <>
//                     <i className="fas fa-eye-slash me-1"></i> Hide Filters
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-eye me-1"></i> Show Filters
//                   </>
//                 )}
//               </button>
//             </div>

//             {expandedFilters && (
//               <div className="row g-3 p-3 border rounded bg-light">
//                 <div className="col-md-3">
//                   <label className="form-label fw-bold">Department</label>
//                   <select
//                     name="department"
//                     onChange={handleFilterChange}
//                     value={filters.department}
//                     className="form-select"
//                     disabled={loading}
//                   >
//                     <option value="">All Departments</option>
//                     {departments.map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="col-md-3">
//                   <label className="form-label fw-bold">Placement Status</label>
//                   <select
//                     name="status"
//                     onChange={handleFilterChange}
//                     value={filters.status}
//                     className="form-select"
//                     disabled={loading}
//                   >
//                     <option value="">All Students</option>
//                     <option value="placed">Placed Only</option>
//                     <option value="unplaced">Unplaced Only</option>
//                   </select>
//                 </div>

//                 <div className="col-md-3">
//                   <label className="form-label fw-bold">Batch Year</label>
//                   <select
//                     name="batchYear"
//                     onChange={handleFilterChange}
//                     value={filters.batchYear}
//                     className="form-select"
//                     disabled={loading}
//                   >
//                     <option value="">All Years</option>
//                     {batchYears.map(year => (
//                       <option key={year} value={year}>{year}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="col-md-3">
//                   <label className="form-label fw-bold">Sort By</label>
//                   <select
//                     name="sortPackage"
//                     onChange={handleFilterChange}
//                     value={filters.sortPackage}
//                     className="form-select"
//                     disabled={loading}
//                   >
//                     <option value="">Default Sorting</option>
//                     <option value="asc">Package: Low to High</option>
//                     <option value="desc">Package: High to Low</option>
//                   </select>
//                 </div>

//                 <div className="col-12 d-flex justify-content-end gap-2">
//                   <button 
//                     onClick={resetFilters} 
//                     className="btn btn-outline-danger"
//                     disabled={loading}
//                   >
//                     <i className="fas fa-undo me-1"></i> Clear All
//                   </button>
                  
//                   <button 
//                     onClick={fetchStudents}
//                     className="btn btn-primary"
//                     disabled={loading}
//                   >
//                     <i className="fas fa-sync-alt me-1"></i> Apply Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {Object.values(filters).some(Boolean) && (
//             <div className="mb-3">
//               <h6 className="mb-2">
//                 <i className="fas fa-tags me-2 text-primary"></i>
//                 Active Filters:
//               </h6>
//               <div className="d-flex flex-wrap gap-2">
//                 {filters.department && (
//                   <span className="badge bg-primary">
//                     <i className="fas fa-building me-1"></i> Department: {filters.department}
//                   </span>
//                 )}
//                 {filters.status && (
//                   <span className="badge bg-success">
//                     <i className="fas fa-user-tie me-1"></i> Status: {filters.status === 'placed' ? 'Placed' : 'Unplaced'}
//                   </span>
//                 )}
//                 {filters.batchYear && (
//                   <span className="badge bg-info text-dark">
//                     <i className="fas fa-calendar-alt me-1"></i> Batch: {filters.batchYear}
//                   </span>
//                 )}
//                 {filters.sortPackage && (
//                   <span className="badge bg-warning text-dark">
//                     <i className={`fas fa-sort-amount-${filters.sortPackage === 'asc' ? 'down' : 'up'} me-1`}></i>
//                     Sort: {filters.sortPackage === 'asc' ? 'Low to High' : 'High to Low'}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="alert alert-danger alert-dismissible fade show">
//               <i className="fas fa-exclamation-circle me-2"></i>
//               {error}
//               <button 
//                 type="button" 
//                 className="btn-close" 
//                 onClick={() => setError(null)}
//               ></button>
//             </div>
//           )}

//           {loading ? (
//             <div className="text-center my-5 py-5">
//               <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading student data...</p>
//             </div>
//           ) : (
//             <div>
//               <div className="row mb-4 g-3">
//                 <div className="col-md-3">
//                   <div className="card border-primary h-100">
//                     <div className="card-body text-center">
//                       <h6 className="card-subtitle mb-2 text-muted">
//                         <i className="fas fa-users me-2"></i>Total Students
//                       </h6>
//                       <h2 className="card-title text-primary">{stats.total}</h2>
//                       <p className="card-text small text-muted">Across all departments</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-md-3">
//                   <div className="card border-success h-100">
//                     <div className="card-body text-center">
//                       <h6 className="card-subtitle mb-2 text-muted">
//                         <i className="fas fa-check-circle me-2"></i>Placed
//                       </h6>
//                       <h2 className="card-title text-success">{stats.placed}</h2>
//                       <p className="card-text small text-muted">
//                         {stats.placementPercentage}% placement rate
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-md-3">
//                   <div className="card border-warning h-100">
//                     <div className="card-body text-center">
//                       <h6 className="card-subtitle mb-2 text-muted">
//                         <i className="fas fa-exclamation-circle me-2"></i>Unplaced
//                       </h6>
//                       <h2 className="card-title text-warning">{stats.unplaced}</h2>
//                       <p className="card-text small text-muted">
//                         {(100 - stats.placementPercentage).toFixed(2)}% unplaced
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-md-3">
//                   <div className="card border-info h-100">
//                     <div className="card-body text-center">
//                       <h6 className="card-subtitle mb-2 text-muted">
//                         <i className="fas fa-rupee-sign me-2"></i>Avg Package
//                       </h6>
//                       <h2 className="card-title text-info">{stats.avgPackage} LPA</h2>
//                       <p className="card-text small text-muted">Average CTC of placed students</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card shadow-sm">
//                 <div className="card-header bg-light">
//                   <h5 className="mb-0">
//                     <i className="fas fa-table me-2"></i>
//                     Student Placement Details
//                   </h5>
//                 </div>
//                 <div className="card-body p-0">
//                   <div className="table-responsive">
//                     <table className="table table-hover mb-0">
//                       <thead className="table-light">
//                         <tr>
//                           <th width="5%">#</th>
//                           <th width="10%">Roll No.</th>
//                           <th width="15%">Name</th>
//                           <th width="10%">Department</th>
//                           <th width="10%">Batch</th>
//                           <th width="10%">Status</th>
//                           <th width="15%">Package (LPA)</th>
//                           <th width="25%">Company</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {students.length > 0 ? (
//                           students.map((student, index) => {
//                             const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
//                             return (
//                               <tr key={student._id || index}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                   <span className="badge bg-secondary">
//                                     {student.studentProfile?.rollNumber || 'N/A'}
//                                   </span>
//                                 </td>
//                                 <td className="fw-bold">{`${student.first_name} ${student.last_name}`}</td>
//                                 <td>
//                                   <span className="badge bg-info text-dark">
//                                     {student.studentProfile?.department || 'N/A'}
//                                   </span>
//                                 </td>
//                                 <td>{student.studentProfile?.addmissionYear || 'N/A'}</td>
//                                 <td>
//                                   <span className={`badge ${hiredJob ? 'bg-success' : 'bg-warning'}`}>
//                                     {hiredJob ? (
//                                       <i className="fas fa-check-circle me-1"></i>
//                                     ) : (
//                                       <i className="fas fa-exclamation-circle me-1"></i>
//                                     )}
//                                     {hiredJob ? 'placed' : 'unplaced'}
//                                   </span>
//                                 </td>
//                                 <td className="text-end fw-bold">
//                                   {hiredJob ? 
//                                     (hiredJob.package?.toFixed(2) || hiredJob.jobId?.salary?.toFixed(2) || 'N/A') : '-'}
//                                 </td>
//                                 <td>
//                                   {hiredJob?.jobId?.company?.companyName ? (
//                                     <span className="badge bg-primary">
//                                       {hiredJob.jobId.company.companyName}
//                                     </span>
//                                   ) : (
//                                     '-'
//                                   )}
//                                 </td>
//                               </tr>
//                             );
//                           })
//                         ) : (
//                           <tr>
//                             <td colSpan="8" className="text-center py-5">
//                               <div className="text-muted">
//                                 <i className="fas fa-inbox fa-3x mb-3"></i>
//                                 <h5>No students found</h5>
//                                 <p>Try adjusting your filters to see results</p>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <div className="card-footer text-muted small">
//                   <div className="d-flex justify-content-between">
//                     <div>
//                       Showing <strong>{students.length}</strong> records
//                     </div>
//                     <div>
//                       Last updated: {new Date().toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportGenerator;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '1 solid #000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '24%',
    padding: 10,
    border: '1 solid #ddd',
    borderRadius: 5,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderBottom: '1 solid #ddd',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: '1 solid #eee',
  },
  col1: { width: '5%' },
  col2: { width: '10%' },
  col3: { width: '15%' },
  col4: { width: '10%' },
  col5: { width: '10%' },
  col6: { width: '10%' },
  col7: { width: '15%', textAlign: 'right' },
  col8: { width: '25%' },
  placedBadge: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '2 5',
    borderRadius: 3,
  },
  unplacedBadge: {
    backgroundColor: '#ffc107',
    color: 'black',
    padding: '2 5',
    borderRadius: 3,
  },
});

// PDF Document Component
const ReportPDF = ({ students, stats, filters }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Placement Report</Text>
        <Text style={styles.date}>
          Generated on: {new Date().toLocaleDateString()}
        </Text>
      </View>

      {Object.values(filters).some(Boolean) && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 5 }}>Filters Applied:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
            {filters.department && (
              <Text>Department: {filters.department}</Text>
            )}
            {filters.status && (
              <Text>Status: {filters.status === 'placed' ? 'Placed' : 'Unplaced'}</Text>
            )}
            {filters.batchYear && (
              <Text>Batch: {filters.batchYear}</Text>
            )}
            {filters.sortPackage && (
              <Text>Sort: {filters.sortPackage === 'asc' ? 'Low to High' : 'High to Low'}</Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text>Total Students</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.total}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#e8f5e9' }]}>
          <Text>Placed</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.placed}</Text>
          <Text style={{ fontSize: 10 }}>{stats.placementPercentage}% placement rate</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fff8e1' }]}>
          <Text>Unplaced</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.unplaced}</Text>
          <Text style={{ fontSize: 10 }}>{(100 - stats.placementPercentage).toFixed(2)}% unplaced</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#e3f2fd' }]}>
          <Text>Avg Package</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{stats.avgPackage} LPA</Text>
          <Text style={{ fontSize: 10 }}>Average CTC</Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.col1}>#</Text>
        <Text style={styles.col2}>Roll No.</Text>
        <Text style={styles.col3}>Name</Text>
        <Text style={styles.col4}>Dept</Text>
        <Text style={styles.col5}>Batch</Text>
        <Text style={styles.col6}>Status</Text>
        <Text style={styles.col7}>Package</Text>
        <Text style={styles.col8}>Company</Text>
      </View>

      {students.length > 0 ? (
  students.map((student, index) => {
    const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
    return (
      <View key={student._id || index} style={styles.tableRow}>
        <Text style={styles.col1}>{index + 1}</Text>
        <Text style={styles.col2}>{student.studentProfile?.rollNumber || 'N/A'}</Text>
        <Text style={styles.col3}>{`${student.first_name} ${student.last_name}`}</Text>
        <Text style={styles.col4}>{student.studentProfile?.department || 'N/A'}</Text>
        <Text style={styles.col5}>{student.studentProfile?.addmissionYear || 'N/A'}</Text>
        <Text style={styles.col6}>
          <Text style={hiredJob ? styles.placedBadge : styles.unplacedBadge}>
            {hiredJob ? 'placed' : 'unplaced'}
          </Text>
        </Text>
        <Text style={styles.col7}>
          {hiredJob ? (hiredJob.package?.toFixed(2) || hiredJob?.jobId?.salary?.toFixed(2) || 'N/A') : '-'}
        </Text>
        <Text style={styles.col8}>
          {hiredJob?.jobId?.company?.companyName || '-'}
        </Text>
      </View>
    );
  })
) : (
  <View style={{ padding: 20, textAlign: 'center' }}>
    <Text>No students found matching the criteria</Text>
  </View>
)}

      <View style={{ marginTop: 20, fontSize: 8, textAlign: 'center' }}>
        <Text>Generated by Placement Portal • {new Date().toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

const ReportGenerator = () => {
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    sortPackage: '',
    batchYear: ''
  });
  const [students, setStudents] = useState([]);
  const [pdfStudents, setPdfStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batchYears, setBatchYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    generateBatchYears();
    fetchStudents();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filters]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/regen/departments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to fetch departments");
      setDepartments(['Computer', 'Civil', 'ECS', 'AIDS', 'Mechanical']);
    }
  };

  const generateBatchYears = () => {
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 5}, (_, i) => currentYear - i);
    setBatchYears(years);
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();

      if (filters.department) queryParams.append('department', filters.department);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.sortPackage) queryParams.append('sortPackage', filters.sortPackage);
      if (filters.batchYear) queryParams.append('batchYear', filters.batchYear);

      const response = await axios.get(`${BASE_URL}/regen/students?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(response.data.students);
      setPdfStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.response?.data?.message || "Failed to fetch student data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      department: '',
      status: '',
      sortPackage: '',
      batchYear: ''
    });
    setStudents([]);
    setPdfStudents([]);
  };

  const getStats = (studentList = students) => {
    const total = studentList.length;
    const placed = studentList.filter(student => 
      student.studentProfile?.appliedJobs?.some(job => job.status === 'hired')
    ).length;
    const unplaced = total - placed;
    
    const placedStudents = studentList.filter(student => 
      student.studentProfile?.appliedJobs?.some(job => job.status === 'hired')
    );
    
    const avgPackage = placed > 0
      ? placedStudents.reduce((sum, student) => {
          const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
          return sum + (hiredJob?.package || hiredJob?.jobId?.salary || 0);
        }, 0) / placed
      : 0;

    return { 
      total, 
      placed, 
      unplaced, 
      avgPackage: avgPackage.toFixed(2),
      placementPercentage: total > 0 ? ((placed / total) * 100).toFixed(2) : 0
    };
  };

  const stats = getStats();
  const pdfStats = getStats(pdfStudents);

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="card-title mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Student Placement Analytics
              </h3>
              <small className="text-white-50">Comprehensive placement statistics and reports</small>
            </div>
            <div className="d-flex gap-2">
              <PDFDownloadLink
                document={<ReportPDF students={pdfStudents} stats={pdfStats} filters={filters} />}
                fileName={`placement-report-${new Date().toISOString().slice(0,10)}.pdf`}
                className="btn btn-light btn-sm"
                onClick={() => setPdfLoading(true)}
                onLoad={() => setPdfLoading(false)}
              >
                {({ loading: pdfLinkLoading }) => (
                  <>
                    <i className="fas fa-file-pdf me-1"></i>
                    {pdfLinkLoading || pdfLoading ? 'Preparing PDF...' : 'Export PDF'}
                  </>
                )}
              </PDFDownloadLink>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-light btn-sm"
              >
                <i className="fas fa-arrow-left me-1"></i> Back
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2 text-primary"></i>
                Filters
              </h5>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setExpandedFilters(!expandedFilters)}
              >
                {expandedFilters ? (
                  <>
                    <i className="fas fa-eye-slash me-1"></i> Hide Filters
                  </>
                ) : (
                  <>
                    <i className="fas fa-eye me-1"></i> Show Filters
                  </>
                )}
              </button>
            </div>

            {expandedFilters && (
              <div className="row g-3 p-3 border rounded bg-light">
                <div className="col-md-3">
                  <label className="form-label fw-bold">Department</label>
                  <select
                    name="department"
                    onChange={handleFilterChange}
                    value={filters.department}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Placement Status</label>
                  <select
                    name="status"
                    onChange={handleFilterChange}
                    value={filters.status}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">All Students</option>
                    <option value="placed">Placed Only</option>
                    <option value="unplaced">Unplaced Only</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Batch Year</label>
                  <select
                    name="batchYear"
                    onChange={handleFilterChange}
                    value={filters.batchYear}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">All Years</option>
                    {batchYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Sort By</label>
                  <select
                    name="sortPackage"
                    onChange={handleFilterChange}
                    value={filters.sortPackage}
                    className="form-select"
                    disabled={loading}
                  >
                    <option value="">Default Sorting</option>
                    <option value="asc">Package: Low to High</option>
                    <option value="desc">Package: High to Low</option>
                  </select>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2">
                  <button 
                    onClick={resetFilters} 
                    className="btn btn-outline-danger"
                    disabled={loading}
                  >
                    <i className="fas fa-undo me-1"></i> Clear All
                  </button>
                  
                  <button 
                    onClick={fetchStudents}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    <i className="fas fa-sync-alt me-1"></i> Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {Object.values(filters).some(Boolean) && (
            <div className="mb-3">
              <h6 className="mb-2">
                <i className="fas fa-tags me-2 text-primary"></i>
                Active Filters:
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {filters.department && (
                  <span className="badge bg-primary">
                    <i className="fas fa-building me-1"></i> Department: {filters.department}
                  </span>
                )}
                {filters.status && (
                  <span className="badge bg-success">
                    <i className="fas fa-user-tie me-1"></i> Status: {filters.status === 'placed' ? 'Placed' : 'Unplaced'}
                  </span>
                )}
                {filters.batchYear && (
                  <span className="badge bg-info text-dark">
                    <i className="fas fa-calendar-alt me-1"></i> Batch: {filters.batchYear}
                  </span>
                )}
                {filters.sortPackage && (
                  <span className="badge bg-warning text-dark">
                    <i className={`fas fa-sort-amount-${filters.sortPackage === 'asc' ? 'down' : 'up'} me-1`}></i>
                    Sort: {filters.sortPackage === 'asc' ? 'Low to High' : 'High to Low'}
                  </span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          {loading ? (
            <div className="text-center my-5 py-5">
              <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading student data...</p>
            </div>
          ) : (
            <div>
              <div className="row mb-4 g-3">
                <div className="col-md-3">
                  <div className="card border-primary h-100">
                    <div className="card-body text-center">
                      <h6 className="card-subtitle mb-2 text-muted">
                        <i className="fas fa-users me-2"></i>Total Students
                      </h6>
                      <h2 className="card-title text-primary">{stats.total}</h2>
                      <p className="card-text small text-muted">Across all departments</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="card border-success h-100">
                    <div className="card-body text-center">
                      <h6 className="card-subtitle mb-2 text-muted">
                        <i className="fas fa-check-circle me-2"></i>Placed
                      </h6>
                      <h2 className="card-title text-success">{stats.placed}</h2>
                      <p className="card-text small text-muted">
                        {stats.placementPercentage}% placement rate
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="card border-warning h-100">
                    <div className="card-body text-center">
                      <h6 className="card-subtitle mb-2 text-muted">
                        <i className="fas fa-exclamation-circle me-2"></i>Unplaced
                      </h6>
                      <h2 className="card-title text-warning">{stats.unplaced}</h2>
                      <p className="card-text small text-muted">
                        {(100 - stats.placementPercentage).toFixed(2)}% unplaced
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="card border-info h-100">
                    <div className="card-body text-center">
                      <h6 className="card-subtitle mb-2 text-muted">
                        <i className="fas fa-rupee-sign me-2"></i>Avg Package
                      </h6>
                      <h2 className="card-title text-info">{stats.avgPackage} LPA</h2>
                      <p className="card-text small text-muted">Average CTC of placed students</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">
                    <i className="fas fa-table me-2"></i>
                    Student Placement Details
                  </h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th width="5%">#</th>
                          <th width="10%">Roll No.</th>
                          <th width="15%">Name</th>
                          <th width="10%">Department</th>
                          <th width="10%">Batch</th>
                          <th width="10%">Status</th>
                          <th width="15%">Package (LPA)</th>
                          <th width="25%">Company</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map((student, index) => {
                            const hiredJob = student.studentProfile?.appliedJobs?.find(job => job.status === 'hired');
                            return (
                              <tr key={student._id || index}>
                                <td>{index + 1}</td>
                                <td>
                                  <span className="badge bg-secondary">
                                    {student.studentProfile?.rollNumber || 'N/A'}
                                  </span>
                                </td>
                                <td className="fw-bold">{`${student.first_name} ${student.last_name}`}</td>
                                <td>
                                  <span className="badge bg-info text-dark">
                                    {student.studentProfile?.department || 'N/A'}
                                  </span>
                                </td>
                                <td>{student.studentProfile?.addmissionYear || 'N/A'}</td>
                                <td>
                                  <span className={`badge ${hiredJob ? 'bg-success' : 'bg-warning'}`}>
                                    {hiredJob ? (
                                      <i className="fas fa-check-circle me-1"></i>
                                    ) : (
                                      <i className="fas fa-exclamation-circle me-1"></i>
                                    )}
                                    {hiredJob ? 'placed' : 'unplaced'}
                                  </span>
                                </td>
                                <td className="text-end fw-bold">
                                  {hiredJob ? 
                                    (hiredJob.package?.toFixed(2) || hiredJob.jobId?.salary?.toFixed(2) || 'N/A') : '-'}
                                </td>
                                <td>
                                  {hiredJob?.jobId?.company?.companyName ? (
                                    <span className="badge bg-primary">
                                      {hiredJob.jobId.company.companyName}
                                    </span>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center py-5">
                              <div className="text-muted">
                                <i className="fas fa-inbox fa-3x mb-3"></i>
                                <h5>No students found</h5>
                                <p>Try adjusting your filters to see results</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-muted small">
                  <div className="d-flex justify-content-between">
                    <div>
                      Showing <strong>{students.length}</strong> records
                    </div>
                    <div>
                      Last updated: {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;


