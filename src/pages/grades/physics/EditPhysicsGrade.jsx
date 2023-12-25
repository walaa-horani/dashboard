import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useThemeProvider } from '../../../utils/ThemeContext';

import { Icon } from '@iconify/react';
const EditHistoryGrade = () => {
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
      grade:'',
      min_grade:""
    });

    const validateForm = () => {
      let formIsValid = true;
      const newErrors = { teacher: '', student: '', grade: '', min_grade: '' };
    
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

      if (!data.grade) {
        formIsValid = false;
        newErrors.grade = 'grade is required';
      }

      if (!data.min_grade) {
        formIsValid = false;
        newErrors.min_grade = 'Min Grade is required';
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
      axios.get(`https://walaadashboard.pythonanywhere.com/api/physicsGradeDetails/${id}/`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [id]);

    
    
    function handleSubmit(e) {
      e.preventDefault();
    
      // Validate the form
      const formIsValid = validateForm();
    
      if (formIsValid) {
        // If the form is valid, proceed with the axios request
        axios.put(`https://walaadashboard.pythonanywhere.com/api/physicsGradeDetails/${id}/`, data)
          .then(res => {
            setOpenSnackbar(true);
            setTimeout(() => {
              navigate('/physicsGrade');
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
    <h1 className=' display-5 text-center m-5'>Edit a Chemistry Grade</h1>
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
         label="Grade"
         fullWidth
         error={Boolean(errors.grade)}
         helperText={errors.grade}
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
        InputLabelProps={{
          className: currentTheme === 'dark' ? 'text-light' : '',
          shrink: Boolean(data.grade), // Shrink label only if there is a value
        }}
      
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,grade:e.target.value})} 
           name='grade'
           value={data.grade}
           
       />
     
   
       <TextField
         label="Min Grade"
         fullWidth
         error={Boolean(errors.min_grade)}
         helperText={errors.min_grade}
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
        InputLabelProps={{
          className: currentTheme === 'dark' ? 'text-light' : '',
          shrink: Boolean(data.min_grade), // Shrink label only if there is a value
        }}
      
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,min_grade:e.target.value})} 
           name='min_grade'
           value={data.min_grade}
           
       />
</div>
              
     
        

       <Button  type="submit" variant="contained" color="primary">
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

export default EditHistoryGrade