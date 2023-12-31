import React, { useCallback ,useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useThemeProvider } from '../../utils/ThemeContext';
import Avatar from 'react-avatar';
import avatar from '../../../src/images/avatar.avif'
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
  email: yup.string().email().required('Email is required'),
  birthdate: yup.string().required('Birth Date is required'),
  faculity: yup.string().required('Faculity is required'),
  country: yup.string().required('Country Date is required'),
  state: yup.string().required('State is required'),
  image: yup.mixed().required('image is required'),


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
  const { handleSubmit, register,control,setValue, formState: { errors } } = useForm({
    resolver: useYupValidationResolver(validationSchema),
  });

  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { currentTheme } = useThemeProvider();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File:', file);

    // Update FormData with the selected file
   
    
    // Display the selected image in the Avatar component
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    setValue('image', file);
  };
  const onSubmit = async (data) => {
    console.log('Data being sent:', data); // Add this line to inspect the data being sent
    try {
      setOpenSnackbar(true);

      const formData = new FormData();
    formData.append('image', data.image); // Assuming 'image' is the key for your image data
    console.log(formData);

    // Append other form data properties if needed
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName)
    formData.append('fatherName', data.fatherName)
    formData.append('motherName', data.motherName)
    formData.append('phone', data.phone)
    formData.append('in_class', data.in_class)
    formData.append('age', data.age)
    formData.append('nationality', data.nationality)
    formData.append('birthdate', data.birthdate)
    formData.append('email', data.email)
    formData.append('zipCode', data.zipCode)
    formData.append('faculity', data.faculity)
    formData.append('country', data.country)
    formData.append('state', data.state)
    formData.append('address', data.address)

    const response = await axios.post('https://walaadashboard.pythonanywhere.com/api/students/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
      
      // Handle the API response as needed
      console.log(response.data);
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error data:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <form className='container' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
     <h1 className=' display-5 text-center m-5'>Add a Student</h1>
     <div className='d-flex '>
      <div style={{flexBasis:'20%'}}>
        <Avatar
            src={selectedImage || avatar}
          size="100"
          round
          error
          helperText={errors.image?.message}
          onClick={() => document.getElementById('avatar-input').click()}
        />
        <input
  id="avatar-input"
  type="file"
  name="image"
  onChange={handleImageChange}
  style={{ display: 'none' }}
  error
  helperText={errors.image?.message}
/>
<p className='text-danger'>image is required</p>

     
      </div>
      <div style={{flexBasis:'80%'}}>
      <div className='d-flex'>
        <TextField
          label="First Name*"
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='firstName'
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

        />

        <TextField
          label="Last Name*"
          {...register('lastName')}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='lastName'
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

        />
      </div>
      <div className='d-flex'>
        <TextField
          label="Father Name*"
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

          {...register('fatherName')}
          error={Boolean(errors.fatherName)}
          helperText={errors.fatherName?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='fatherName'
        />

        <TextField
          label="Mother Name*"
          {...register('motherName')}
          error={Boolean(errors.motherName)}
          helperText={errors.motherName?.message}
          fullWidth
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

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
        InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
        InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

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
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

          margin="normal"
          style={{marginRight:'10px'}}
          name='in_class'
          type='number'
        />
</div>



<div className='d-flex'>
      <TextField
        label="Age*"
        InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
        InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

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
          label="Nationality*"
          {...register('nationality')}
          error={Boolean(errors.nationality)}
          helperText={errors.nationality?.message}
          fullWidth
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

          margin="normal"
          style={{marginRight:'10px'}}
          name='nationality'
        />
</div>

<div className='d-flex'>
<TextField
  label="Birth Date*"
  {...register('birthdate')}
  error={Boolean(errors.birthdate)}
  helperText={errors.birthdate?.message}
  fullWidth
  
  type='date'
  margin="normal"
  style={{ marginRight: '10px' }}
  name='birthdate'
  InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
  InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
/>

      <TextField
          label="Email*"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='email'
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

        />
</div>

<div className='d-flex'>
      <TextField
        label="zip code"
        {...register('zip code')}
       
        fullWidth
        type='number'
        margin="normal"
        style={{marginRight:'10px'}}
        name='zipCode'
        InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
        InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

      />
      <TextField
          label="Faculity"
          {...register('faculity')}
          error={Boolean(errors.faculity)}
          helperText={errors.faculity?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='faculity'
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

        />
</div>

<div className='d-flex'>
      <TextField
        label="Country*"
        {...register('country')}
        helperText={errors.country?.message}
        error={Boolean(errors.country)}
        InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
        InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}


        fullWidth
        type='text'
        margin="normal"
        style={{marginRight:'10px'}}
        name='country'
      />
      <TextField
          label="State*"
          {...register('state')}
          error={Boolean(errors.state)}
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
          InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

          helperText={errors.state?.message}
          fullWidth
          margin="normal"
          style={{marginRight:'10px'}}
          name='state'
        />
</div>

<TextField
  label="Address*"
  InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
  InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}

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
      </div>
      </div>
    </form>
  );
}
