import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
const EditStudent = () => {
    const {id} = useParams()
    const [data,setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('https://walaadashboard.pythonanywhere.com/api/'+id).then(res => setData(res.data)).catch(err => console.log(err))
    })
    function handleSubmit(e){
        e.preventDefault()
        axios.put('https://walaadashboard.pythonanywhere.com/api/'+id,data).then(resp => {
            alert('suuseccful')
            navigate('https://walaadashboard.pythonanywhere.com/api/')

        })

    }
  return (
    <div><form onClick={handleSubmit} className='container' >
    <h1 className=' display-5 text-center m-5'>Edit a Student</h1>
     <div className='d-flex'>
       <TextField
         label="First Name"
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,FirstName:e.target.value})} 
         value={data.FirstName} 

       />

       <TextField
         label="Last Name"
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         onChange={e=> setData({...data,LastName:e.target.value})}  
         value={data.LastName} 

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
       />

       <TextField
         label="Mother Name"
         onChange={e=> setData({...data,motherName:e.target.value})}   
        name='motherName'
         fullWidth
         margin="normal"
         style={{marginRight:'10px'}}
         value={data.motherName}
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
     />

<TextField
       label="Phone"
       fullWidth
       name='age'
       margin="normal"
       onChange={e=> setData({...data,age:e.target.value})}   
       style={{marginRight:'10px'}}
       value={data.age}
     />
     <TextField
         label="Class"
         fullWidth
         name='in_class'
         margin="normal"
         onChange={e=> setData({...data,in_class:e.target.value})}  
         style={{marginRight:'10px'}}
         value={data.in_class}

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
   </form></div>
  )
}

export default EditStudent