import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { BASE_URL } from '../../config/config';

function Home() {
  document.title = 'PCC | Admin Dashboard';

  const [stats, setStats] = useState({
    totalStudents: 0,
    approvedStudents: 0,
    totalStudentsDeptWise: {},
    totalStudentsPlaced: 0,
    totalUnplacedStudents: 0,
    highestPackage: 0,
    highestPackageStudent: null,
    superUsers: 0,
    tpoUsers: 0,
    managementUsers: 0,
    avgPackage: 0,
    totalCompanies: 0,
    studentApprovalPendingUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/all-users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setStats(response.data);
      } catch (error) {
        console.log("Home.jsx => ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-700">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of placement statistics and user management</p>
          </div>

          {/* User Count Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardCard 
              title="Management Admin" 
              value={stats.managementUsers} 
              icon="users-cog" 
              color="bg-indigo-100 border-indigo-500"
              link="../admin/management"
            />
            <DashboardCard 
              title="TPO Admin" 
              value={stats.tpoUsers} 
              icon="user-tie" 
              color="bg-blue-100 border-blue-500"
              link="../admin/tpo"
            />
            <DashboardCard 
              title="Students" 
              value={stats.totalStudents} 
              icon="user-graduate" 
              color="bg-green-100 border-green-500"
              link="../admin/student"
            />
            <DashboardCard 
              title="Superuser" 
              value={stats.superUsers} 
              icon="user-shield" 
              color="bg-purple-100 border-purple-500"
            />
          </div>

          {/* Approval Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard 
              title="Approved Students" 
              value={stats.approvedStudents} 
              icon="user-check" 
              trend="up"
              description="Successfully approved"
              color="bg-teal-100 border-teal-500"
            />
            {stats.studentApprovalPendingUsers !== 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <Link className="block" to='../admin/approve-student'>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-orange-800 flex items-center">
                        <i className="fas fa-exclamation-circle mr-2" />
                        Pending Approvals
                      </h3>
                      <p className="text-orange-600 mt-1">
                        {stats.studentApprovalPendingUsers} students waiting
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Badge bg="warning" pill className="text-white px-3 py-1 text-lg">
                        Action Needed
                      </Badge>
                      <i className="fas fa-chevron-right ml-2 text-orange-500" />
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Placement Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
              title="Total Companies" 
              value={stats.totalCompanies} 
              icon="building" 
              trend="up"
              description="Registered for placements"
            />
            <StatCard 
              title="Placed Students" 
              value={stats.totalStudentsPlaced} 
              icon="briefcase" 
              trend="up"
              description="Successfully placed"
            />
            <StatCard 
              title="Unplaced Students" 
              value={stats.totalUnplacedStudents} 
              icon="user-clock" 
              trend="down"
              description="Seeking opportunities"
            />
            <StatCard 
              title="Avg Package" 
              value={`${stats.avgPackage} LPA`} 
              icon="money-bill-wave" 
              trend="up"
              description="Average salary offered"
            />
          </div>

          {/* Highest Package and Department-wise Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {stats.highestPackage > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-red-800">Highest Package</h3>
                  <i className="fas fa-trophy text-2xl text-red-500" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{stats.highestPackage} LPA</div>
                {stats.highestPackageStudent && (
                  <div className="mt-4 bg-white p-3 rounded-lg shadow-inner">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <i className="fas fa-user text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">{stats.highestPackageStudent.name}</p>
                        <p className="text-sm text-gray-600">{stats.highestPackageStudent.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-university text-blue-500 mr-2" />
                Department-wise Distribution
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {Object.entries(stats.totalStudentsDeptWise).map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{dept}</span>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">{count}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Card Component
const DashboardCard = ({ title, value, icon, color, link }) => {
  const content = (
    <div className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-white bg-opacity-50 p-3 rounded-full">
          <i className={`fas fa-${icon} text-xl`} />
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block hover:no-underline">
      {content}
    </Link>
  ) : content;
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, trend, description, color = "bg-white" }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? 'arrow-up' : 'arrow-down';

  return (
    <div className={`border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className={`bg-opacity-20 ${trendColor} p-2 rounded-full`}>
            <i className={`fas fa-${icon} ${trendColor}`} />
          </div>
          {trend && (
            <span className={`text-xs mt-2 flex items-center ${trendColor}`}>
              <i className={`fas fa-${trendIcon} mr-1`} />
              {trend === 'up' ? 'Increased' : 'Decreased'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;