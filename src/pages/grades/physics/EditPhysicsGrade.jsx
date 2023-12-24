import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

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
    <h1 className=' display-5 text-center m-5'>Edit a Physics Grade</h1>
     <div className='d-flex'>
     <FormControl fullWidth margin="normal">
      <InputLabel htmlFor="teacher-select">Teacher</InputLabel>
      <Select
  style={{ marginRight: '10px' }}
  label="Teacher"
  name="teacher"
  error
  helperText={errors.teacher}
  value={data.teacher} // Set the initial value to the current teacher
  onChange={(e) => setData({ ...data, teacher: e.target.value })} // Handle changes to the selected teacher
  inputProps={{
    id: 'teacher-select',
  }}
>
  {teachers.map((teacher) => (
    <MenuItem key={teacher.id} value={teacher.id}>
      {teacher.firstName} {/* Adjust this based on your teacher object structure */}
    </MenuItem>
  ))}
</Select>

    </FormControl>

<FormControl fullWidth margin="normal">
      <InputLabel htmlFor="student-select">Student</InputLabel>
      <Select
  label="Student"
  name="student"
  error
  helperText={errors.student}
  value={data.student} // Set the initial value to the current student
  onChange={(e) => setData({ ...data, student: e.target.value })} // Handle changes to the selected student
  inputProps={{
    id: 'student-select',
  }}
>
  {students.map((student) => (
    <MenuItem key={student.id} value={student.id}>
      {student.firstName}
    </MenuItem>
  ))}
</Select>

    </FormControl>
</div>
<div className='d-flex'>
       <TextField
         label="Grade"
         fullWidth
         error={Boolean(errors.grade)}
  helperText={errors.grade}
         name='grade'
         margin="normal"
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,grade:e.target.value})}  
         value={data.grade} 
         InputLabelProps={{
          shrink: Boolean(data.grade),  // Shrink label only if there is a value
        }}

       />
     
   
       <TextField
         label="Min Grade"
         fullWidth
         error={Boolean(errors.min_grade)}
         helperText={errors.min_grade}
         margin="normal"

         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,min_grade:e.target.value})} 
           name='min_grade'
           value={data.min_grade}
           InputLabelProps={{
            shrink: Boolean(data.min_grade),  // Shrink label only if there is a value
          }}
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