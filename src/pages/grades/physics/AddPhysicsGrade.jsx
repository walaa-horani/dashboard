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
import { useThemeProvider } from '../../../utils/ThemeContext';

const validationSchema = yup.object({
  teacher: yup.string().required('teacher is required'),
  student: yup.string().required('student is required'),
  grade: yup.string().required('Grade is required'),
  min_grade: yup.string().required('Min Grade is required'),
  

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

export default function AddPhysicsGrade() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: useYupValidationResolver(validationSchema),
  });
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudent] = useState([]);
  const { currentTheme } = useThemeProvider();

  
  const onSubmit = async (data) => {
    console.log('Data being sent:', data);
    try {
      setOpenSnackbar(true)
      const response = await axios.post('https://walaadashboard.pythonanywhere.com/api/physicsGrade/', data);
      console.log('Response:', response);
      setTimeout(() => {
        navigate('/physicsGrade');
      }, 1000);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  useEffect(() => {
    // Fetch the list of physics when the component mounts
    const fetchStudent = async () => {
      try {
        const response = await axios.get('https://walaadashboard.pythonanywhere.com/api/students/');
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching physics:', error);
      }
    };
    fetchStudent();
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

 

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
    <h1 className=' display-5 text-center m-5'>Add a Physics Grade</h1>
     <div className='d-flex'>
   

     <FormControl className={currentTheme === 'dark' ? 'text-light' : ''} fullWidth margin="normal">
 <InputLabel className={currentTheme === 'dark' ? 'text-light' : ''} htmlFor="student-select">
   Student
 </InputLabel>
 <Select
   label="Student"
   {...register('student')}
   error={Boolean(errors.student)}
   name="student"
   className={currentTheme === 'dark' ? 'border border-light' : ''}
   inputProps={{
     id: 'student-select',
     className: currentTheme === 'dark' ? 'text-light' : '',

   }}
 >
   {students.map((student) => (
     <MenuItem key={student.id} value={student.id}>
       <p className={currentTheme === 'dark' ? 'text-light' : ''}>
         {student.firstName} {student.lastName}
       </p>
     </MenuItem>
   ))}
 </Select>
 <FormHelperText>{errors.student?.message}</FormHelperText>
</FormControl>

<FormControl fullWidth margin="normal">
 <InputLabel className={currentTheme === 'dark' ? 'text-light' : ''} htmlFor="teacher-select">
   Teacher
 </InputLabel>
 <Select
   label="Teacher"
   {...register('teacher')}
   error={Boolean(errors.teacher)}
   name="teacher"
   className={currentTheme === 'dark' ? 'border border-light' : ''}
   inputProps={{
     id: 'teacher-select',
     className: currentTheme === 'dark' ? 'text-light' : '',

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
       type='number'
         label="Grade"
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         {...register('grade')}
         error={Boolean(errors.grade)}
         helperText={errors.grade?.message}
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         name='grade'
         InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
         InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
         
       />

       <TextField
         label="Min Grade"
         type='number'
         className={currentTheme === 'dark' ? 'border border-light' : ''}
         InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
         InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

         {...register('min_grade')}
         error={Boolean(errors.min_grade)}
         helperText={errors.min_grade?.message}
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         name='min_grade'        />
       
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
