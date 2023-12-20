import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';

const StudentDetails = () => {
    const { id } = useParams();
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
        chemistry_grades: [],  // Assuming chemistry_grades is an array of ChemistryGrade objects
    });

    useEffect(() => {
        axios.get(`https://walaadashboard.pythonanywhere.com/api/studentDetails/${id}/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <Container style={{padding:'30px'}} >
        


            <div style={ {boxShadow:'4px 5px 25px rgba(0,0,0,0.2)', height:'auto', padding:'30px'}} className='userInfo  '>
                
           <h4 className='mb-2'>User Profile</h4>
           <hr className='mb-2'/>
              <div className='d-flex'>
              
               <div >
               img
            
               </div>
                 
               <div >

                    fdfffff
               </div>
               
               </div>
            <div className='d-flex  mt-5'>
                <div style={{width:'100%'}}>

                
            <TextField style={{width:'90%'}} id="filled-basic" readonly label="First Name" variant="filled" value={data.firstName}/>
            </div>
            <div style={{width:'100%'}}>
            <TextField style={{width:'100%'}} id="filled-basic" readonly label="Last Name" variant="filled" value={data.lastName}/>
            </div>
              </div>


              <div className='d-flex  mt-5'>
                <div >

                
            <TextField style={{marginRight:'15px'}} id="filled-basic" readonly label="Father Name" variant="filled" value={data.fatherName}/>
            </div>
            <div>
            <TextField style={{marginRight:'15px'}}  id="filled-basic" readonly label="Mother Name" variant="filled" value={data.motherName}/>
            </div>

            <div >
            <TextField style={{marginRight:'15px'}}  id="filled-basic" readonly label="Age" variant="filled" value={data.age}/>
            </div>

            <div >
            <TextField style={{marginRight:'15px'}}  id="filled-basic" readonly label="Class" variant="filled" value={data.in_class}/>
            </div>
            </div>
              </div>

                <div className='d-flex'>
              <div className='mt-5' style={ {boxShadow:'4px 5px 25px rgba(0,0,0,0.2)', height:'auto', padding:'30px', marginRight:'30px',flexBasis:'50%'}}>
              <h4 className='mb-2'>Contact</h4>
           <hr className='mb-2'/>
          <div className='d-flex'>
           <div style={{ width:'100%'}}>
           
            <TextField style={{marginRight:'15px', width:'100%'}}  id="filled-basic" readonly label="Phone" variant="filled" value={data.phone}/>
            </div>

            <div style={{ width:'100%'}}>
           
            <TextField style={{marginLeft:'15px', width:'100%'}}  id="filled-basic" readonly label="Email" variant="filled" value={data.in_class}/>
            </div>

            
            </div>


            <div style={{ width:'100%'}}>
           
           <TextField style={{marginTop:'25px', width:'100%'}}  id="filled-basic" readonly label="Status" variant="filled" value={data.in_class}/>
           </div>
              </div>

              <div className='mt-5' style={ {boxShadow:'4px 5px 25px rgba(0,0,0,0.2)', height:'auto', padding:'30px',flexBasis:'50%'}}>
              <h4 className='mb-2'>Contact</h4>
           <hr className='mb-2'/>
           <div className='d-flex'>
           <div style={{ width:'100%'}}>
           
            <TextField style={{marginRight:'15px', width:'100%'}}  id="filled-basic" readonly label="Phone" variant="filled" value={data.phone}/>
            </div>

            <div style={{ width:'100%'}}>
           
            <TextField style={{marginLeft:'15px', width:'100%'}}  id="filled-basic" readonly label="Email" variant="filled" value={data.in_class}/>
            </div>

            
            </div>

            <div style={{ width:'100%'}}>
           
           <TextField style={{marginTop:'25px', width:'100%'}}  id="filled-basic" readonly label="Status" variant="filled" value={data.in_class}/>
           </div>
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

export default StudentDetails;
