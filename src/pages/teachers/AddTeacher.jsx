import React, { useCallback ,useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  motherName: yup.string().required('Mother Name is required'),
  fatherName: yup.string().required('Father Name is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  in_class: yup.string().required('Class is required'),
  age: yup.string().required('age is required'),
  nationality: yup.string().required('nationality is required'),

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

export default function AddStudent() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: useYupValidationResolver(validationSchema),
  });
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = async (data) => {
    console.log('Data being sent:', data);

    try {
      // Open the Snackbar before making the API call
      setOpenSnackbar(true);

      // Make API call using axios
      const response = await axios.post('https://walaadashboard.pythonanywhere.com/api/teachers/', data);

      // Handle the API response as needed
      console.log(response.data);

      // Navigate after a delay or based on some condition
      setTimeout(() => {
        navigate('/teachers');
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      // Handle API error
      console.error('Error submitting data:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
     <h1 className=' display-5 text-center m-5'>Add a Teacher</h1>
      <div className='d-flex'>
        <TextField
          label="First Name"
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='firstName'
        />

        <TextField
          label="Last Name"
          {...register('lastName')}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='lastName'
        />
      </div>
      <div className='d-flex'>
        <TextField
          label="Father Name"
          {...register('fatherName')}
          error={Boolean(errors.fatherName)}
          helperText={errors.fatherName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='fatherName'
        />

        <TextField
          label="Mother Name"
          {...register('motherName')}
          error={Boolean(errors.motherName)}
          helperText={errors.motherName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='motherName'        />
        
      </div>
      <div className='d-flex'>
      <TextField
        label="Phone"
        {...register('phone')}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        fullWidth
        type='number'
        margin="normal"
        style={{marginRight:'10px'}}
        name='phone'
      />
      <TextField
          label="Class"
          {...register('in_class')}
          error={Boolean(errors.in_class)}
          helperText={errors.in_class?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='in_class'
        />
</div>

<div className='d-flex'>
      <TextField
        label="Age"
        type='number'
        {...register('age')}
        error={Boolean(errors.age)}
        helperText={errors.age?.message}
        fullWidth
        margin="normal"
        style={{marginRight:'10px'}}
        name='age'
      />
      <TextField
          label="Nationality"
          {...register('nationality')}
          error={Boolean(errors.nationality)}
          helperText={errors.nationality?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='nationality'
        />
</div>

<TextField
  label="Address"
  {...register('address')}
  error={Boolean(errors.address)}
  helperText={errors.address?.message}
  fullWidth
  margin="normal"
  name='address'
  multiline
  rows={4}
  style={{
    marginRight: '10px',
    outline: 'transparent',
    border: 'transparent',
    boxShadow: 'transparent',  
    
  }}
/>

     
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
