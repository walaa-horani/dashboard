import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useThemeProvider } from '../../utils/ThemeContext';

import { Icon } from '@iconify/react';
const EditPhysics = () => {
    const {id} = useParams()
    const [data, setData] = useState({
      teacher: null, // Set default teacher value
      student: null, // Set default student value
      time: '',
      date: '',
      place: '',
    });
    const { currentTheme } = useThemeProvider();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState({
      teacher: '',
      student: '',
      time: '',
      date: '',
      place: '',
    });

    const validateForm = () => {
      let formIsValid = true;
      const newErrors = { teacher: '', student: '', time: '', date: '', place: '' };
    
      // Validate teacher
      if (!data.teacher) {
        formIsValid = false;
        newErrors.teacher = 'Teacher is required';
      }
    
      // Validate student
      if (!data.student) {
        formIsValid = false;
        newErrors.student = 'Student is required';
      }
    
      // Validate time
      if (!data.time) {
        formIsValid = false;
        newErrors.time = 'Time is required';
      }
    
      // Validate date
      if (!data.date) {
        formIsValid = false;
        newErrors.date = 'Date is required';
      }
    
      // Validate place
      if (!data.place) {
        formIsValid = false;
        newErrors.place = 'Place is required';
      }
    
      setErrors(newErrors);
      return formIsValid;
    };

    const navigate = useNavigate()

    useEffect(() => {
      // Fetch the list of students when the component mounts
      const fetchStudents = async () => {
        try {
          const response = await axios.get('https://walaadashboard.pythonanywhere.com/api/students/');
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      fetchStudents();
    }, []);
  
  
    useEffect(() => {
      // Fetch the list of teachers when the component mounts
      const fetchTeachers = async () => {
        try {
          const response = await axios.get('https://walaadashboard.pythonanywhere.com/api/teachers');
          setTeachers(response.data);
          console.log('response',response.data)
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      };
      fetchTeachers();
    }, []);
    useEffect(() => {
      axios.get(`https://walaadashboard.pythonanywhere.com/api/physics/${id}/`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [id]);

    
    
    function handleSubmit(e) {
      e.preventDefault();
    
      // Validate the form
      const formIsValid = validateForm();
    
      if (formIsValid) {
        // If the form is valid, proceed with the axios request
        axios.put(`https://walaadashboard.pythonanywhere.com/api/physics/${id}/`, data)
          .then(res => {
            setOpenSnackbar(true);
            setTimeout(() => {
              navigate('/physics');
            }, 1000);
          })
          .catch(error => {
            // Handle error, if needed
            console.error('Error updating information:', error);
          });
      }
    }
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
  
  
  return (
    <div><form onSubmit={handleSubmit} className='container' >
    <h1 className=' display-5 text-center m-5'>Edit a Physics Lesson</h1>
     <div className='d-flex'>
     <FormControl fullWidth margin="normal">
  <InputLabel htmlFor="teacher-select" className={currentTheme === 'dark' ? 'text-light' : ''}>
    Teacher
  </InputLabel>
  <Select
    style={{ marginRight: '10px' }}
    label="Teacher"
    name="teacher"
    
    error
    value={data.teacher}
    onChange={(e) => setData({ ...data, teacher: e.target.value })}
    inputProps={{
      id: 'teacher-select',
      className: currentTheme === 'dark' ? 'text-light' : '',
    }}
  >
    {teachers.map((teacher) => (
      <MenuItem key={teacher.id} value={teacher.id}>
        {teacher.firstName}
      </MenuItem>
    ))}
  </Select>
  <FormHelperText>{errors.teacher}</FormHelperText>
</FormControl>


<FormControl fullWidth margin="normal">
  <InputLabel htmlFor="student-select" className={currentTheme === 'dark' ? 'text-light' : ''}>
    Student
  </InputLabel>
  <Select
    label="Student"
    error
    name="student"
    inputProps={{
      id: 'student-select',
      className: currentTheme === 'dark' ? 'text-light' : '',
    }}
    value={data.student}
    onChange={(e) => setData({ ...data, student: e.target.value })}
  >
    {students.map((student) => (
      <MenuItem key={student.id} value={student.id}>
        {student.firstName}
      </MenuItem>
    ))}
  </Select>
  <FormHelperText>{errors.student}</FormHelperText>
</FormControl>



</div>
<div className='d-flex'>
<TextField
  label="time"
  fullWidth
  error={Boolean(errors.time)}
  helperText={errors.time}
  name='time'
  className={currentTheme === 'dark' ? 'border border-light' : ''}

  margin="normal"
  style={{ marginRight: '10px' }}
  onChange={e => setData({ ...data, time: e.target.value })}
  value={data.time}
  InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff border border-light' : '', // Set the text color based on the theme
    },
  }}
  InputLabelProps={{
    className: currentTheme === 'dark' ? 'text-light' : '',
    shrink: Boolean(data.time), // Shrink label only if there is a value
  }}
/>

     
   
     <TextField
  label="date"
  fullWidth
  error={Boolean(errors.date)}
  helperText={errors.date}
  margin="normal"
  className={currentTheme === 'dark' ? 'border border-light' : ''}

  style={{ marginRight: '10px' }}
  onChange={e => setData({ ...data, date: e.target.value })}
  name='date'
  value={data.date}
  InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
    },
  }}
  InputLabelProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the label text color based on the theme
    },
    className: currentTheme === 'dark' ? 'text-light' : '',
    shrink: Boolean(data.date), // Shrink label only if there is a value
  }}
/>

</div>
<TextField
  label="place"
  onChange={e => setData({ ...data, place: e.target.value })}
  name='place'
  fullWidth
  className={currentTheme === 'dark' ? 'border border-light' : ''}

  error={Boolean(errors.place)}
  helperText={errors.place}
  margin="normal"
  style={{ marginRight: '10px' }}
  value={data.place}
  InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff border border-light' : '', // Set the text color based on the theme
    },
  }}
  InputLabelProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the label text color based on the theme
    },
    shrink: Boolean(data.place),  // Shrink label only if there is a value
  }}
/>

       
     
        

       <Button type="submit" variant="contained" color="primary">
        Update <Icon style={{ marginLeft: '6px' }} icon="ic:baseline-plus" />
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert variant="filled" onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
        Updated Successfully!
        </Alert>
      </Snackbar>
     
      
   </form></div>
  )
}

export default EditPhysics