import React from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import { Icon } from '@iconify/react';
import { Link, Navigate } from 'react-router-dom';
import Banner from '../../partials/Banner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useThemeProvider } from '../../utils/ThemeContext';

function Teachers() {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate()
  const [searchTxt, setsearchTxt] = useState('')
  const { currentTheme } = useThemeProvider();

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
    fetch(`https://walaadashboard.pythonanywhere.com/api/teachers?firstName=${searchTxt}`)
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTxt]);
  const handleDelete = () => {
    if (idToDelete) {
      axios.delete(`https://walaadashboard.pythonanywhere.com/api/teachers/${idToDelete}`)
      .then(res => {
          // If the deletion is successful, update the state to trigger a re-render
          setTeachers(prevteachers => prevteachers.filter(teacher => teacher.id !== idToDelete));
          // Close the dialog
          handleClose();
          // Navigate to '/'
          navigate('/teachers');
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

           
            <WelcomeBanner />

            
           
           

            {/* Cards */}
            <div className="container w-100">
              <div className='d-flex  justify-content-between'>
            <div style={{float:'right'}}>
              <Link to={'/AddTeacher'}>
                <button style={{ height: '57px',float:'right',marginRight:'15px'}} className="btn mb-5 bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <Link
      to="/AddTeacher"
      className="hidden xs:block ml-2"
      style={{ transition: '#fff', textDecoration: 'none', color: '#fff' }}
      onMouseOver={(e) => (e.target.style.color =  '#fff')}
      onMouseOut={(e) => (e.target.style.color = '#fff')}  >
      Add Teacher
    </Link>      
     </button>  
     </Link>
      </div>  
      <div>

      <form className="border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
             
              <input
               value={searchTxt} onChange={e=> setsearchTxt(e.target.value)}
                className="w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
              
              />
             
            </div>
          </form>
      </div>
          
          </div>
          <div style={{ overflowX: 'auto' }}>

            <table class="table table-striped">
  <thead>
    <tr className='text-center'>
    <th style={{fontSize:'13px', color:'#6f42c1'}}>Name</th>
    
      <th style={{fontSize:'13px', color:'#6f42c1'}}>age</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Father's Name</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Mother's Name</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Class</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Phone</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>Nationality</th>
      <th style={{fontSize:'13px', color:'#6f42c1'}}>image</th>

    </tr>
  </thead>
  <tbody>
        {teachers.map((teacher) => (
        <tr className={` text-center ${currentTheme === 'dark' ? 'text-light' : ''}`} key={teacher.id}>
        <td >{teacher.firstName} {teacher.lastName}</td>
            
            <td>{teacher.age}</td>
            <td>{teacher.fatherName}</td>
            <td>{teacher.motherName}</td>
            <td>{teacher.in_class}</td>
            <td>{teacher.phone}</td>
            <td>{teacher.nationality}</td>
            <td><img style={{borderRadius:'50%',width:'50px', height:'50px', objectFit:'cover'}} src={teacher.image}/>  </td>

           <td style={{width:'50px'}}> <Link to={`/Editteacher/${teacher.id}`}><Icon style={{fontSize:'24px'}} icon="openmoji:edit" /></Link></td>
           <td  style={{ fontSize:'24px',width:'50px'}} > <button onClick={() => handleClickOpen(teacher.id)} ><Icon   icon="flat-color-icons:delete-row" /></button></td>
           <td style={{width:'50px', fontSize:'24px'}}> <Link to={`/teacherDetails/${teacher.id}`}><Icon icon="lets-icons:view-fill" /></Link></td>

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

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );

}


export default Teachers;