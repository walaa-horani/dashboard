import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { Icon } from '@iconify/react';
const EditStudent = () => {
    const {id} = useParams()
    const [data, setData] = useState({
      firstName: '', // Set default teacher value
      lastName: '', // Set default student value
      fatherName: '',
      motherName: '',
      phone: '',
      age: '',
      nationality: '',
      address: '',
      in_class:'',
    });
    
    const [open, setOpen] = useState(false);
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
      nationality: '',
      address: '', };
    
      // Validate teacher
      if (!data.firstName) {
        formIsValid = false;
        newErrors.firstName = 'first Name is required';
      }
    
      // Validate student
      if (!data.lastName) {
        formIsValid = false;
        newErrors.lastName = 'last Name is required';
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

    const navigate = useNavigate()

   
  
  
    
    useEffect(() => {
      axios.get(`https://walaadashboard.pythonanywhere.com/api/students/${id}/`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [id]);

    const handleClick = () => {
      setOpen(true);
    };
    
    function handleSubmit(e) {
      e.preventDefault();
    
      // Validate the form
      const formIsValid = validateForm();
    
      if (formIsValid) {
       
        // If the form is valid, proceed with the axios request
        axios.put(`https://walaadashboard.pythonanywhere.com/api/students/${id}/`, data)
          .then(res => {
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
    
  
  
    
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  return (
    <div><form onSubmit={handleSubmit} className='container' >
    <h1 className=' display-5 text-center m-5'>Edit a Student</h1>
    
<div className='d-flex'>
       <TextField
         label="firstName"
         fullWidth
         error={Boolean(errors.firstName)}
  helperText={errors.firstName}
         name='firstName'
         margin="normal"
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,firstName:e.target.value})}  
         value={data.firstName} 
         InputLabelProps={{
          shrink: Boolean(data.firstName),  // Shrink label only if there is a value
        }}

       />
     
   
       <TextField
         label="last Name"
         fullWidth
         error={Boolean(errors.lastName)}
         helperText={errors.lastName}
         margin="normal"

         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,lastName:e.target.value})} 
           name='lastName'
           value={data.lastName}
           InputLabelProps={{
            shrink: Boolean(data.lastName),  // Shrink label only if there is a value
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
         style={{marginRight:'10px'}}
         value={data.fatherName}
         InputLabelProps={{
          shrink: Boolean(data.fatherName),  // Shrink label only if there is a value
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
         InputLabelProps={{
          shrink: Boolean(data.motherName),  // Shrink label only if there is a value
        }}
       />

       </div>


    <div className='d-flex'>

       <TextField
         label="phone"
         onChange={e=> setData({...data,phone:e.target.value})}   
        name='phone'
         fullWidth
         error={Boolean(errors.phone)}
         helperText={errors.phone}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.phone}
         InputLabelProps={{
          shrink: Boolean(data.phone),  // Shrink label only if there is a value
        }}
       />

<TextField
         label="Age"
         onChange={e=> setData({...data,age:e.target.value})}   
        name='age'
         fullWidth
         error={Boolean(errors.age)}
         helperText={errors.age}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.age}
         InputLabelProps={{
          shrink: Boolean(data.age),  // Shrink label only if there is a value
        }}
       />

       </div>   

       <div className='d-flex'>

       <TextField
         label="Nationality"
         onChange={e=> setData({...data,nationality:e.target.value})}   
        name='nationality'
         fullWidth
         error={Boolean(errors.nationality)}
         helperText={errors.nationality}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.nationality}
         InputLabelProps={{
          shrink: Boolean(data.nationality),  // Shrink label only if there is a value
        }}
       />

<TextField
         label="Class"
         onChange={e=> setData({...data,in_class:e.target.value})}   
        name='class'
         fullWidth
         error={Boolean(errors.in_class)}
         helperText={errors.in_class}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.in_class}
         InputLabelProps={{
          shrink: Boolean(data.in_class),  // Shrink label only if there is a value
        }}
       />

       </div>  
       
       <TextField
         label="Address"
         onChange={e=> setData({...data,address:e.target.value})}   
        name='address'
         fullWidth
         error={Boolean(errors.address)}
         helperText={errors.address}
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.address}
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}
       />
        

     <Button onClick={handleClick} type="submit" variant="contained" color="primary">
       Update  <Icon style={{marginLeft:'6px'}} icon="ic:baseline-plus" />
     </Button>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled"  onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          The Information Has Been Updated
        </Alert>
      </Snackbar>
     
      
   </form></div>
  )
}

export default EditStudent