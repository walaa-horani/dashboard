import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h2>{data.firstName} {data.lastName}</h2>
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
                        </ul>
        </div>
    );
};

export default StudentDetails;
