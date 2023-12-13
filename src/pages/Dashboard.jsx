import React from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { Icon } from '@iconify/react';

import Banner from '../partials/Banner';
import { useState, useEffect } from 'react';
function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('http://127.0.0.1:8000/api/')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
           

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
              
                {/* Datepicker built with flatpickr */}
             
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <div className="container w-100">

            <table class="table table-striped">
  <thead>
    <tr>
    <th ><Icon style={{ display:'flex', width:'30px',height:'30px', marginRight: '8px' }} icon="ph:student" />Studen's Name</th>
      <th ><Icon style={{ width:'30px',height:'30px', marginRight: '8px' }} icon="arcticons:broken-age" />age</th>
      <th ><Icon style={{ width:'30px',height:'30px', marginRight: '8px' }} icon="healthicons:i-training-class" />Class</th>
      <th ><Icon style={{ width:'30px',height:'30px', marginRight: '8px' }} icon="solar:phone-line-duotone" />Phone</th>
    </tr>
  </thead>
  <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <th scope="row">{student.name}</th>
            <td>{student.age}</td>
            <td>{student.in_class}</td>
            <td>{student.phone}</td>
          </tr>
        ))}
      </tbody>
</table>
              
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;