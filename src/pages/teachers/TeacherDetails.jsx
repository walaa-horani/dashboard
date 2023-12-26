import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Container} from '@mui/material';
import {TextField} from '@mui/material';
import { useThemeProvider } from '../../utils/ThemeContext';

const TeacherDetails = () => {
    const { id } = useParams();
    const { currentTheme } = useThemeProvider();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        motherName: '',
        phone: '',
        age: '',
        nationality: '',
        address: '',
        in_class: '',
        zipCode: '',
        faculity: '',
        chemistry_grades: [],  // Assuming chemistry_grades is an array of ChemistryGrade objects
    });

    useEffect(() => {
        axios.get(`https://walaadashboard.pythonanywhere.com/api/teacherDetails/${id}/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]);
    const style = {
        boxShadow: '4px 5px 25px rgba(0, 0, 0, 0.2)',
        height: 'auto',
        padding: '30px',
        marginRight: '30px',
        flexBasis: '50%',
        border: currentTheme === 'dark' ? '1px solid white' : '', // Adjust the colors as needed
      };
    return (
        <Container style={{padding:'30px'}} >
        


        <div className='mt-5' style={style}>
                    
                <div   className='d-flex align-items-center justify-content-between'>
    
    <div>
    <h4 className='mb-2 display-6'>User Profile</h4>
    </div>
    <div>
    <Link style={{backgroundColor:'#4F46E5', color:'#fff', padding:'10px 20px', borderRadius:'5px'}} to={`/EditTeacher/${data.id}/`}><button>Edit</button></Link>
    
    </div>
    </div>
                  <div className='d-flex '>
                  
                   <div >
                   img
                
                   </div>
                     
                   <div >
    
                        fdfffff
                   </div>
                   
                   </div>
                <div className='d-flex   mt-5'>
                    <div style={{width:'100%'}}>
    
                    
                <TextField InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
            InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{width:'90%'}} id="filled-basic" readonly label="First Name" variant="filled" value={data.firstName}/>
                </div>
                <div style={{width:'100%'}}>
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{width:'100%'}} id="filled-basic" readonly label="Last Name" variant="filled" value={data.lastName}/>
                </div>
                  </div>
    
    
                  <div className='d-flex  mt-5'>
                    <div >
    
                    
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px'}} id="filled-basic" readonly label="Father Name" variant="filled" value={data.fatherName}/>
                </div>
                <div>
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px'}}  id="filled-basic" readonly label="Mother Name" variant="filled" value={data.motherName}/>
                </div>
    
                <div >
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px'}}  id="filled-basic" readonly label="Age" variant="filled" value={data.age}/>
                </div>
    
                <div >
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px'}}  id="filled-basic" readonly label="Class" variant="filled" value={data.in_class}/>
                </div>
                </div>
                  </div>
    
                    <div className='d-flex'>
        <div className='mt-5' style={style}>
                  <h4 className='mb-2'>Contact</h4>
               <hr className='mb-2'/>
              <div className='d-flex'>
               <div style={{ width:'100%'}}>
               
                <TextField            InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px', width:'100%'}}  id="filled-basic" readonly label="Phone" variant="filled" value={data.phone}/>
                </div>
    
                <div style={{ width:'100%'}}>
               
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginLeft:'15px', width:'100%'}}  id="filled-basic" readonly label="Email" variant="filled" value={data.email || 'unknown'}/>
                </div>
    
                
                </div>
    
    
                <div style={{ width:'100%'}}>
               
               <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginTop:'25px', width:'100%'}}  id="filled-basic" readonly label="faculity" variant="filled" value={data.faculity || 'unknown'}/>
               </div>
                  </div>
    
                  <div className='mt-5' style={style}>
                  <h4 className='mb-2'>Address</h4>
               <hr className='mb-2'/>
               <div className='d-flex'>
               <div style={{ width:'100%'}}>
               
                <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginRight:'15px', width:'100%'}}  id="filled-basic" readonly label="Country" variant="filled" value={data.country || 'unknown'}/>
                </div>
    
                <div style={{ width:'100%'}}>
               
                <TextField            InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginLeft:'15px', width:'100%'}}  id="filled-basic" readonly label="State" variant="filled" value={data.state || 'unknown'}/>
                </div>
    
                
                </div>
    
                <div style={{ width:'100%'}}>
               
               <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     style={{marginTop:'25px', width:'100%'}}  id="filled-basic" readonly label="Zip Code" variant="filled" value={data.zipCode || 'unknown'}/>
               </div>
                
               <TextField           InputLabelProps={{ shrink: true, className: currentTheme === 'dark' ? 'text-light' : '' }}
              InputProps={{ className: currentTheme === 'dark' ? ' border border-light text-light' : '' }}
     multiline rows='3' style={{marginTop:'25px', width:'100%'}}  id="filled-basic" readonly label="Address" variant="filled" value={data.address}/>
                  </div>
                  </div>
                  
                 
                 
    
    
    
          
       
       
        
    
    
       
    
 
    
                {/* <h2>{data.firstName} {data.lastName}</h2>
                <h3>Chemistry Grades</h3>
                <ul>
                    {data.chemistry_grades.map((grade, index) => (
                        <li key={index}>
                            Grade: {grade.grade},
                          
                        </li>
                    ))}
    
    <ul>
    {data?.chemistry?.map((grade, index) => (
        <li key={index}>
         
            Place: {grade.place}
            Time: {grade?.time }
        </li>
    ))}
                </ul>
                            </ul> */}
            </Container>
    );
};

export default TeacherDetails;
