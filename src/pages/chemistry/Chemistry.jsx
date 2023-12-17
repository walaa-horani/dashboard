import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import { Icon } from '@iconify/react';
import { Link, Navigate } from 'react-router-dom';
import Banner from '../../partials/Banner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Chemistry() {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chemistry, setChemistry] = useState([]);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate()

  const handleClickOpen = (id) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIdToDelete(null);
  };


  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('https://walaadashboard.pythonanywhere.com/api/chemistry/')
      .then((response) => response.json())
      .then((data) => setChemistry(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handleDelete = () => {
    if (idToDelete) {
      axios.delete(`https://walaadashboard.pythonanywhere.com/api/chemistry/${idToDelete}`)
        .then(res => {
          // If the deletion is successful, update the state to trigger a re-render
          setChemistry(prevchemistrys => prevchemistrys.filter(chemistry => chemistry.id !== idToDelete));
          // Close the dialog
          handleClose();
          // Navigate to '/'
          navigate('/chemistry');
        })
        .catch(err => {
          console.log(err);
          // Close the dialog on error
          handleClose();
        });
    }
  };
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
            <div style={{float:'right'}}>
                <button style={{float:'right'}} className="btn mb-5 bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <Link
      to="/AddChemistry"
      className="hidden xs:block ml-2"
      style={{ transition: '#fff', textDecoration: 'none', color: '#fff' }}
      onMouseOver={(e) => (e.target.style.color =  '#fff')}
      onMouseOut={(e) => (e.target.style.color = '#fff')}  >
      Add Chemistry Lesson
    </Link>      
     </button>  
      </div>    

            {/* Cards */}
            <div className="container w-100">

            <table class="table table-striped">
  <thead>
    <tr className='text-center'>
    <th style={{fontSize:'13px', color:'#6f42c1'}}>Student</th>
    
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Teacher</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Time</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Date</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Place</th>

    </tr>
  </thead>
  <tbody>
        {chemistry.map((chemistry) => (
          <tr className='text-center' key={chemistry.id}>
            <td >{chemistry.student} </td>
            
            <td>{chemistry.teacher}</td>
           
            <td>{chemistry.time}</td>
            <td>{chemistry.date}</td>
            <td>{chemistry.place}</td>
           
            
           <td style={{width:'50px'}}> <Link to={`/Editchemistry/${chemistry.id}`}><Icon style={{fontSize:'24px'}} icon="openmoji:edit" /></Link></td>
           <td  style={{ fontSize:'24px',width:'50px'}} > <button onClick={() => handleClickOpen(chemistry.id)} ><Icon   icon="flat-color-icons:delete-row" /></button></td>
           <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  variant="contained" color="error" onClick={handleClose} >
            No
          </Button>
          <Button  variant="contained" color="success" onClick={handleDelete}  >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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


export default Chemistry;