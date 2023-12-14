import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { Icon } from '@iconify/react';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  MotherName: yup.string().required('Mother Name is required'),
  fatherName: yup.string().required('Father Name is required'),
  phone: yup.string().required('Phone is required'),
  Address: yup.string().required('Address is required'),
  Class: yup.string().required('Class is required'),

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

  const onSubmit = async (data) => {
    console.log('Data being sent:', data); // Add this line to inspect the data being sent
    try {
      // Make API call using axios
      const response = await axios.post('https://walaadashboard.pythonanywhere.com/api', data);
      
      // Handle the API response as needed
      console.log(response.data);
    } catch (error) {
      // Handle API error
      console.error('Error submitting data:', error);
    }
  };
  
  

  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)}>
     <h1 className=' display-5 text-center m-5'>Add a Student</h1>
      <div className='d-flex'>
        <TextField
          label="First Name"
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
        />

        <TextField
          label="Last Name"
          {...register('lastName')}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
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
        />

        <TextField
          label="Mother Name"
          {...register('MotherName')}
          error={Boolean(errors.MotherName)}
          helperText={errors.MotherName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
        />
        
      </div>
      <div className='d-flex'>
      <TextField
        label="Phone"
        {...register('phone')}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        fullWidth
        margin="normal"
        style={{marginRight:'10px'}}
      />
      <TextField
          label="Class"
          {...register('Class')}
          error={Boolean(errors.Class)}
          helperText={errors.Class?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
        />
</div>
<TextField
  label="Address"
  {...register('Address')}
  error={Boolean(errors.Address)}
  helperText={errors.Address?.message}
  fullWidth
  margin="normal"
  multiline
  rows={4}
  style={{
    marginRight: '10px',
    outline: 'transparent',
    border: 'transparent',
    boxShadow: 'transparent',  // Set boxShadow to 'none' to remove the ring shadow
  }}
/>

      <Button type="submit" variant="contained" color="primary">
        Add  <Icon style={{marginLeft:'6px'}} icon="ic:baseline-plus" />
      </Button>
    </form>
  );
}
