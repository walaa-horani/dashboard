import React, { useCallback ,useState,useEffect  } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const validationSchema = yup.object({
  teacher: yup.string().required('teacher is required'),
  student: yup.string().required('student is required'),
  time: yup.string().required('time is required'),
  date: yup.string().required('date is required'),
  place: yup.string().required('place is required'),
  

});

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default function AddPysics() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: useYupValidationResolver(validationSchema),
  });
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  
  const onSubmit = async (data) => {
    console.log('Data being sent:', data);
    try {
      setOpenSnackbar(true);
      const response = await axios.post('https://walaadashboard.pythonanywhere.com/api/outdoor/', data);
      console.log('Response:', response);
      setTimeout(() => {
        navigate('/outdoors');
      }, 1000);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
   const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
        const response = await axios.get('https://walaadashboard.pythonanywhere.com/api/teachers/');
        setTeachers(response.data);
        console.log('response',response.data)
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };
  // const handleClick = () => {
  //   setOpen(true);
  // };

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
     <h1 className=' display-5 text-center m-5'>Add  OutDoors Activity</h1>
      <div className='d-flex'>
    

<FormControl fullWidth margin="normal">
      <InputLabel htmlFor="student-select">Student</InputLabel>
      <Select
        label="Student"
        {...register('student')}
        error={Boolean(errors.student)}
        name="student"
        
        inputProps={{
          id: 'student-select',
        }}
      >
        {students.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {student.firstName} {/* Adjust this based on your student object structure */}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors.student?.message}</FormHelperText>
    </FormControl>

    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor="teacher-select">Teacher</InputLabel>
      <Select
        label="Teacher"
      
        {...register('teacher')}
        error={Boolean(errors.teacher)}
        name="teacher"
        
        inputProps={{
          id: 'teacher-select',
        }}
      >
        {teachers.map((teacher) => (
          <MenuItem key={teacher.id} value={teacher.id}>
            {teacher.firstName} {/* Adjust this based on your student object structure */}
          </MenuItem>
        ))}
      </Select>
    
    </FormControl>

        
      </div>
      <div className='d-flex'>
        <TextField
        type='time'
          label="time"
          {...register('time')}
          error={Boolean(errors.time)}
          helperText={errors.time?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='time'
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="date"
          type='date'
          {...register('date')}
          error={Boolean(errors.date)}
          helperText={errors.date?.message}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          style={{marginRight:'10px'}}
          name='date'        />
        
      </div>
      <div className='d-flex'>
    
      <TextField
          label="place"
          {...register('place')}
          error={Boolean(errors.place)}
          helperText={errors.place?.message}
         
          margin="normal"
          style={{width:'50%'}}
          name='place'
        />
</div>





     
<Button type="submit" variant="contained" color="primary">
        Add <Icon style={{ marginLeft: '6px' }} icon="ic:baseline-plus" />
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert variant="filled" onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Created Successfully!
        </Alert>
      </Snackbar>
    </form>
  );
}
