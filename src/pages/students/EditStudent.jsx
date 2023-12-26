import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useThemeProvider } from '../../utils/ThemeContext';

import { Icon } from '@iconify/react';
const EditStudent = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { currentTheme } = useThemeProvider();

    const {id} = useParams()
    const [data, setData] = useState({
      firstName: '', // Set default student value
      lastName: '', // Set default student value
      fatherName: '',
      motherName: '',
      phone: '',
      age: '',
      nationality: '',
      address: '',
      in_class:'',
      birthdate:"",
      email:"",
      country:"",
      state:"",
      faculity:"",
    });
    
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      fatherName: '',
      motherName: '',
      phone: '',
      age: '',
      nationality: '',
      address: '',
      in_class:"",
      birthdate:"",
      email:"",
      country:"",
      state:"",
      faculity:"",
    });

    const validateForm = () => {
      let formIsValid = true;
      const newErrors = 
      {firstName: '',
      lastName: '',
      fatherName: '',
      motherName: '',
      phone: '',
      age: '',
      in_class:"",
      faculity:"",
      nationality: '',
      birthdate:"",
      email:"",
      country:"",
      state:"",
      address: '', };
    
      // Validate student
      if (!data.firstName) {
        formIsValid = false;
        newErrors.firstName = 'first Name is required';
      }
      
      if (!data.country) {
        formIsValid = false;
        newErrors.country = 'country is required';
      }
      if (!data.state) {
        formIsValid = false;
        newErrors.state = 'state is required';
      }
      // Validate student
      if (!data.lastName) {
        formIsValid = false;
        newErrors.lastName = 'last Name is required';
      }

      if (!data.faculity) {
        formIsValid = false;
        newErrors.faculity = 'Faculity is required';
      }
    
      // Validate time
      if (!data.fatherName) {
        formIsValid = false;
        newErrors.fatherName = 'father Name is required';
      }
    
      if (!data.motherName) {
        formIsValid = false;
        newErrors.motherName = 'motherName Name is required';
      }

      // Validate date
      if (!data.phone) {
        formIsValid = false;
        newErrors.phone = 'phone is required';
      }
      if (!data.email) {
        formIsValid = false;
        newErrors.email = 'email is required';
      }

      if (!data.birthdate) {
        formIsValid = false;
        newErrors.birthdate = 'Birth Date is required';
      }
    
      if (!data.age) {
        formIsValid = false;
        newErrors.age = 'Age is required';
      }

      if (!data.in_class) {
        formIsValid = false;
        newErrors.in_class = 'Class is required';
      }
      // Validate place
      if (!data.nationality) {
        formIsValid = false;
        newErrors.nationality = 'nationality is required';
      }
    
      if (!data.address) {
        formIsValid = false;
        newErrors.address = 'address is required';
      }

      setErrors(newErrors);
      return formIsValid;
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  
      // Clear validation error when the user starts typing
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    };
  
    const navigate = useNavigate()

   
  
  
    
    useEffect(() => {
      axios.get(`https://walaadashboard.pythonanywhere.com/api/students/${id}/`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [id]);

   
    function handleSubmit(e) {
      e.preventDefault();
    
      // Validate the form
      const formIsValid = validateForm();
    
      if (formIsValid) {
       
        // If the form is valid, proceed with the axios request
        axios.put(`https://walaadashboard.pythonanywhere.com/api/students/${id}/`, data)
          .then(res => {
            setOpenSnackbar(true);
            setTimeout(() => {
              navigate('/');
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
  
    const handleDateChange = (newDate) => {
      // Assuming you have a function to update the state, for example, setFormData
      setFormData((prevData) => ({
        ...prevData,
        birthdate: newDate,
      }));
    };
    const handleEmailChange = (newEmail) => {
      // Assuming you have a function to update the state, for example, setFormData
      setFormData((prevData) => ({
        ...prevData,
        email: newEmail,
      }));
    };
  return (
    <div><form onSubmit={handleSubmit} className='container' >
    <h1 className=' display-5 text-center m-5'>Edit a Student</h1>
    <img src={`https://walaadashboard.pythonanywhere.com/api/${data.image}`} />
<div className='d-flex'>
       <TextField
         label="firstName"
         fullWidth
         error={Boolean(errors.firstName)}
  helperText={errors.firstName}
         name='firstName'
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,firstName:e.target.value})}  
         value={data.firstName} 
         InputLabelProps={{
          className: currentTheme === 'dark' ? 'text-light' : '',

          shrink: Boolean(data.firstName),  // Shrink label only if there is a value
        }}
        InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
       />
     
   
       <TextField
         label="last Name"
         fullWidth
         error={Boolean(errors.lastName)}
         helperText={errors.lastName}
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,lastName:e.target.value})} 
           name='lastName'
           value={data.lastName}
           InputLabelProps={{
            className: currentTheme === 'dark' ? 'text-light ' : '',

            shrink: Boolean(data.lastName),  // Shrink label only if there is a value
          }}
          InputProps={{
            style: {
              color: currentTheme === 'dark' ? '#fff ' : '', // Set the text color based on the theme
            },
          }}
       />
</div>



<div className='d-flex'>

       <TextField
         label="Father Name"
         onChange={e=> setData({...data,fatherName:e.target.value})}   
        name='fatherName'
         fullWidth
         error={Boolean(errors.fatherName)}
         helperText={errors.fatherName}
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         style={{marginRight:'10px'}}
         value={data.fatherName}
         InputLabelProps={{
          shrink: Boolean(data.fatherName), 
                      className: currentTheme === 'dark' ? 'text-light ' : '',
 // Shrink label only if there is a value
        }}
       />

<TextField
         label="mother Name"
         onChange={e=> setData({...data,motherName:e.target.value})}   
        name='motherName'
         fullWidth
         error={Boolean(errors.motherName)}
         helperText={errors.motherName}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.motherName}
         className={currentTheme === 'dark' ? 'border border-light' : ''}
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         InputLabelProps={{
          shrink: Boolean(data.motherName),
          className: currentTheme === 'dark' ? 'text-light ' : '',
          // Shrink label only if there is a value
        }}
       />

       </div>


    <div className='d-flex'>

       <TextField
         label="phone"
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         onChange={e=> setData({...data,phone:e.target.value})}   
        name='phone'
         fullWidth
         error={Boolean(errors.phone)}
         helperText={errors.phone}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.phone}
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         InputLabelProps={{
          shrink: Boolean(data.phone),
          className: currentTheme === 'dark' ? 'text-light ' : '',
          // Shrink label only if there is a value
        }}
       />

<TextField
         label="Age"
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         onChange={e=> setData({...data,age:e.target.value})}   
        name='age'
         fullWidth
         error={Boolean(errors.age)}
         helperText={errors.age}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.age}
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         InputLabelProps={{
          shrink: Boolean(data.age), 
          className: currentTheme === 'dark' ? 'text-light ' : '',
          // Shrink label only if there is a value
        }}
       />

       </div>   

       <div className='d-flex'>

       <TextField
       InputProps={{
        style: {
          color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
        },
      }}
         label="Nationality"
         onChange={e=> setData({...data,nationality:e.target.value})}   
        name='nationality'
         fullWidth
         error={Boolean(errors.nationality)}
         helperText={errors.nationality}
         margin="normal"
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         style={{marginRight:'10px'}}
         value={data.nationality}
         InputLabelProps={{
          shrink: Boolean(data.nationality),
          className: currentTheme === 'dark' ? 'text-light ' : '',
          // Shrink label only if there is a value
        }}
       />

<TextField
         label="Class"
         InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         onChange={e=> setData({...data,in_class:e.target.value})}   
        name='class'
         fullWidth
         error={Boolean(errors.in_class)}
         helperText={errors.in_class}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.in_class}
         
         className={currentTheme === 'dark' ? 'border border-light' : ''}

         InputLabelProps={{
          className: currentTheme === 'dark' ? 'text-light ' : '',

          shrink: Boolean(data.in_class),  // Shrink label only if there is a value
        }}
       />

       </div>  

       <div className='d-flex'>

       <TextField
  label="Birth Date"
  error={Boolean(errors.birthdate)}
  helperText={errors.birthdate?.message}
  fullWidth
  className={currentTheme === 'dark' ? 'border border-light' : ''}
  InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
    },
  }}
  type='date'
  margin="normal"
  value={data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : ''} // format the date
  style={{ marginRight: '10px' }}
  name='birthdate'
  InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
}}
  
  onChange={handleChange} 
/>

      <TextField
          label="Email"
          className={currentTheme === 'dark' ? 'border border-light' : ''}
          InputProps={{
            style: {
              color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
            },
          }}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
          value={data.email}
          InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
        }}
          margin="normal"
          style={{marginRight:'10px'}}
          name='email'
          onChange={handleChange}
          
        />

       </div> 


       <div className='d-flex'>

<TextField
label="Country"
InputProps={{
  style: {
    color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
  },
}}
error={Boolean(errors.country)}
helperText={errors.country?.message}
fullWidth
type='text'
margin="normal"
onChange={e=> setData({...data,country:e.target.value})}   
className={currentTheme === 'dark' ? 'border border-light' : ''}

value={data.country} // format the date
style={{ marginRight: '10px' }}
name='country'
InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
}}
/>

<TextField
   label="State"
   error={Boolean(errors.state)}
   helperText={errors.state?.message}
   fullWidth
   className={currentTheme === 'dark' ? 'border border-light' : ''}
   InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
    },
  }}
   value={data.state}
   onChange={e=> setData({...data,state:e.target.value})}   
   InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
  }}
   margin="normal"
   style={{marginRight:'10px'}}
   name='state'
   
 />

<TextField
   label="Faculity"
   error={Boolean(errors.faculity)}
   helperText={errors.faculity?.message}
   fullWidth
   className={currentTheme === 'dark' ? 'border border-light' : ''}
   InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
    },
  }}
   value={data.faculity}
   onChange={e=> setData({...data,faculity:e.target.value})}   
   InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
  }}
   margin="normal"
   style={{marginRight:'10px'}}
   name='faculity'
   
 />

</div> 
<div className='d-flex'>
<TextField
  label="Birth Date"
  error={Boolean(errors.birthdate)}
  helperText={errors.birthdate?.message}
  fullWidth
  className={currentTheme === 'dark' ? 'border border-light' : ''}
  InputProps={{
    style: {
      color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
    },
  }}
  type='date'
  margin="normal"
  value={data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : ''}
  style={{ marginRight: '10px' }}
  name='birthdate'
  InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
}}  onChange={handleChange}

/>
       <TextField
         label="Address"
         onChange={e=> setData({...data,address:e.target.value})}   
        name='address'
        className={currentTheme === 'dark' ? 'border border-light' : ''}
        InputProps={{
          style: {
            color: currentTheme === 'dark' ? '#fff' : '', // Set the text color based on the theme
          },
        }}
         fullWidth
         error={Boolean(errors.address)}
         helperText={errors.address}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.address}
         InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light ' : '',
        }}       />
       </div> 

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

export default EditStudent