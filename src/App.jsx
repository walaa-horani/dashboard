import { useLocation} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import React, { useEffect } from 'react';
import EditStudent  from './pages/students/EditStudent';
import EditTeacher from './pages/teachers/EditTeacher';
import EditChemistry from './pages/chemistry/EditChemistry';
import EditPhysics from './pages/physics/EditPhysics';
import EditMath from './pages/math/EditMath';
import EditSport from './pages/sport/EditSport';
import EditOutDoors from './pages/outDoors/EditOutDoors';




// Import pages
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/students/AddStudent';
import AddTeacher from './pages/teachers/AddTeacher';
import AddChemistry from './pages/chemistry/AddChemistry';
import AddPhysics from './pages/physics/AddPhysics';
import AddMath from './pages/math/AddMath';
import AddSport from './pages/sport/AddSport';
import AddOutDoors from './pages/outDoors/AddOutDoors';
import StudenDetails from './pages/students/StudenDetails';
import TeacherDetails from './pages/teachers/TeacherDetails';


import Teachers from './pages/teachers/Teachers';
import Chemistry from './pages/chemistry/Chemistry';
import Physics from './pages/physics/Physics';
import Math from './pages/math/Math';
import Sport from './pages/sport/Sport';
import OutDoors from './pages/outDoors/OutDoors';


import ChemistryGrade from './pages/grades/ChemistryGrade';
import PhysicsGrade from './pages/grades/PhysicsGrade';
import MathGrade from './pages/grades/MathGrade';
import HistoryGrade from './pages/grades/HistoryGrade';
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Routes>
    <Route path='/' index element={<Dashboard />} />
    <Route path='/studentDetails/:id' index element={<StudenDetails />} />
    <Route path='/teacherDetails/:id' index element={<TeacherDetails />} />

    <Route path="/teachers" element={<Teachers />} />
    <Route path="/chemistry" element={<Chemistry />} />
    <Route path="/physics" element={<Physics />} />
    <Route path="/math" element={<Math />} />
    <Route path="/sport" element={<Sport />} />
    <Route path="/outdoors" element={<OutDoors />} />



          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/AddTeacher" element={<AddTeacher />} />
          <Route path="/AddChemistry" element={<AddChemistry />} />
          <Route path="/AddPhysics" element={<AddPhysics />} />
          <Route path="/AddMath" element={<AddMath />} />
          <Route path="/AddSport" element={<AddSport />} />
          <Route path="/AddOutDoors" element={<AddOutDoors />} />

          

          <Route path="/EditStudent/:id" element={<EditStudent />} />
          <Route path="/EditTeacher/:id" element={<EditTeacher />} />
          <Route path="/EditChemistry/:id" element={<EditChemistry />} />
          <Route path="/EditPhysics/:id" element={<EditPhysics />} />
          <Route path="/EditMath/:id" element={<EditMath />} />
          <Route path="/EditSport/:id" element={<EditSport />} />
          <Route path="/EditOutDoors/:id" element={<EditOutDoors />} />



          <Route path="/HistoryGrade" element={<HistoryGrade />} />
          <Route path="/PhysicsGrade" element={<PhysicsGrade />} />
          <Route path="/ChemistryGrade" element={<ChemistryGrade />} />
          
          <Route path="/MathGrade" element={<MathGrade />} />


          <Route path="/HistoryGrade/:id" element={<HistoryGradeDetails />} />
          <Route path="/PhysicsGrade/:id" element={<PhysicsGradeDetails />} />
          <Route path="/ChemistryGrade/:id" element={<ChemistryGradeDetails />} />
          
          <Route path="/MathGrade/:id" element={<MathGrade />} />

          
         
    </Routes>
  </>
  );
}

export default App;
