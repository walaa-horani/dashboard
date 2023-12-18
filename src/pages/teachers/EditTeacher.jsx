import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { Icon } from '@iconify/react';
const Editteacher = () => {
    const {id} = useParams()
    const [data,setData] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`https://walaadashboard.pythonanywhere.com/api/teachers/${id}/`).then(res => setData(res.data)).catch(err => console.log(err))
    }, [id]);
    function handleSubmit(e){
        e.preventDefault()
      

        axios.put(`https://walaadashboard.pythonanywhere.com/api/teachers/${id}/`,data).then(res => {
          setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/teachers');
        }, 1000);

        })

    }
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
    return(
    <div><form onSubmit={handleSubmit} className='container' >
    <h1 className=' display-5 text-center m-5'>Edit  Teacher</h1>
     <div className='d-flex'>
       <TextField
         label="First Name"
         fullWidth
         margin="normal"
         name='firstName'
         style={{marginRight:'10px'}}
         onChange={e => setData({...data, firstName:e.target.value}) }
         value={data.firstName} 
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}

       />

       <TextField
         label="Last Name"
         fullWidth
         name='lastName'
         margin="normal"
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,lastName:e.target.value})}  
         value={data.lastName} 
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}

       />
     </div>
     <div className='d-flex'>
       <TextField
         label="Father Name"
         fullWidth
         margin="normal"

         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,fatherName:e.target.value})} 
           name='fatherName'
           value={data.fatherName}
           InputLabelProps={{
            shrink: Boolean(data.address),  // Shrink label only if there is a value
          }}
       />

       <TextField
         label="Mother Name"
         onChange={e=> setData({...data,motherName:e.target.value})}   
        name='motherName'
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.motherName}
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}
       />
       
     </div>
     <div className='d-flex'>
     <TextField
       label="Phone"
       name='phone'
       fullWidth
       margin="normal"
       onChange={e=> setData({...data,phone:e.target.value})}   
       style={{marginRight:'10px'}}
       value={data.phone}
       InputLabelProps={{
        shrink: Boolean(data.address),  // Shrink label only if there is a value
      }}
     />

<TextField
       label="Age"
       fullWidth
       name='age'
       margin="normal"
       onChange={e=> setData({...data,age:e.target.value})}   
       style={{marginRight:'10px'}}
       value={data.age}
       InputLabelProps={{
        shrink: Boolean(data.address),  // Shrink label only if there is a value
      }}
     />
     
</div>
<div className='d-flex'>
<TextField
         label="Nationality"
         fullWidth
         name='nationality'
         margin="normal"
         onChange={e=> setData({...data,nationality:e.target.value})}  
         style={{marginRight:'10px'}}
         value={data.nationality}
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}

       />
       <TextField
         label="Class"
         fullWidth
         name='in_class'
         margin="normal"
         onChange={e=> setData({...data,in_class:e.target.value})}  
         style={{marginRight:'10px'}}
         value={data.in_class}
         InputLabelProps={{
          shrink: Boolean(data.address),  // Shrink label only if there is a value
        }}

       />
       </div>
<TextField
 label="Address"
 name='address'
 value={data.address}
 fullWidth
 margin="normal"
 onChange={e=> setData({...data,address:e.target.value})}  
 multiline
 rows={4}
 InputLabelProps={{
  shrink: Boolean(data.address),  // Shrink label only if there is a value
}}
 style={{
   marginRight: '10px',
   outline: 'transparent',
   border: 'transparent',
   boxShadow: 'transparent',  // Set boxShadow to 'none' to remove the ring shadow
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

export default Editteacher