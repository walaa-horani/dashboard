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
import EditHistory from './pages/history/EditHistory';
import StudentSearch from './pages/students/StudentSearch';




import EditHistoryGrade from './pages/grades/history/EditHistoryGrade'
import EditChemistryGrade from './pages/grades/chemistry/EditChemistryGrade'
import EditPhysicsGrade from './pages/grades/physics/EditPhysicsGrade'
import EditMathGrade from './pages/grades/maths/EditMathsGrade'



// Import pages
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/students/AddStudent';
import AddTeacher from './pages/teachers/AddTeacher';
import AddChemistry from './pages/chemistry/AddChemistry';
import AddPhysics from './pages/physics/AddPhysics';
import AddMath from './pages/math/AddMath';
import AddSport from './pages/sport/AddSport';

import AddHistoryGrade from './pages/grades/history/AddHistoryGrade';
import AddChemistryGrade from './pages/grades/chemistry/AddChemistryGrade';
import AddMathGrade from './pages/grades/maths/AddMathsGrade';
import AddPhysicsGrade from './pages/grades/physics/AddPhysicsGrade';

import AddHistory from './pages/history/AddHistory';
import AddOutDoors from './pages/outDoors/AddOutDoors';


import Teachers from './pages/teachers/Teachers';
import Chemistry from './pages/chemistry/Chemistry';
import Physics from './pages/physics/Physics';
import Math from './pages/math/Math';
import Sport from './pages/sport/Sport';
import OutDoors from './pages/outDoors/OutDoors';
import History from './pages/history/History';


import ChemistryGrade from '././pages/grades/chemistry/ChemistryGrade';
import PhysicsGrade from './pages/grades/physics/PhysicsGrade';
import MathGrade from './pages/grades/maths/MathGrade';
import HistoryGrade from './pages/grades/history/HistoryGrade';

import ChemistryGradeDetails from './pages/grades/chemistry/ChemistryGradeDetails';
import PhysicsGradeDetails from './pages/grades/physics/PhysicsGradeDetails';
import MathGradeDetails  from './pages/grades/maths/MathGradeDetails ';
import HistoryGradeDetails from './pages/grades/history/HistoryGradeDetails';
import StudenDetails from './pages/students/StudenDetails';
import TeacherDetails from './pages/teachers/TeacherDetails';

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
    <Route path="/search/:searchstring" element={<StudentSearch />} />

    <Route path='/teacherDetails/:id' index element={<TeacherDetails />} />

    <Route path="/teachers" element={<Teachers />} />
    <Route path="/chemistry" element={<Chemistry />} />
    <Route path="/physics" element={<Physics />} />
    <Route path="/math" element={<Math />} />
    <Route path="/sport" element={<Sport />} />
    <Route path="/outdoors" element={<OutDoors />} />
    <Route path="/history" element={<History />} />



          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/AddTeacher" element={<AddTeacher />} />
          <Route path="/AddChemistry" element={<AddChemistry />} />
          <Route path="/AddPhysics" element={<AddPhysics />} />
          <Route path="/AddMath" element={<AddMath />} />
          <Route path="/AddSport" element={<AddSport />} />
          <Route path="/AddHistory" element={<AddHistory />} />

          <Route path="/AddOutDoors" element={<AddOutDoors />} />
         
          <Route path="/AddHistoryGrade" element={<AddHistoryGrade />} />
          <Route path="/AddChemistryGrade" element={<AddChemistryGrade />} />
          <Route path="/AddPhysicsGrade" element={<AddPhysicsGrade />} />
          <Route path="/AddMathGrade" element={<AddMathGrade />} />

          

          <Route path="/EditStudent/:id" element={<EditStudent />} />
          <Route path="/EditTeacher/:id" element={<EditTeacher />} />
          <Route path="/EditChemistry/:id" element={<EditChemistry />} />
          <Route path="/EditPhysics/:id" element={<EditPhysics />} />
          <Route path="/EditMath/:id" element={<EditMath />} />
          <Route path="/EditSport/:id" element={<EditSport />} />
          <Route path="/EditOutDoors/:id" element={<EditOutDoors />} />
          <Route path="/EditHistory/:id" element={<EditHistory />} />



          <Route path="/EditMathGradeDetails/:id" element={<EditMathGrade/>} />
          <Route path="/EditPhysicsGradeDetails/:id" element={<EditPhysicsGrade/>} />
          <Route path="/EditChemistryGradeDetails/:id" element={<EditChemistryGrade />} />
          <Route path="/EditHistoryGradeDetails/:id" element={<EditHistoryGrade />} />



          <Route path="/HistoryGrade" element={<HistoryGrade />} />
          <Route path="/PhysicsGrade" element={<PhysicsGrade />} />
          <Route path="/ChemistryGrade" element={<ChemistryGrade />} />
          
          <Route path="/MathGrade" element={<MathGrade />} />


          <Route path="/HistoryGradeDetails/:id" element={<HistoryGradeDetails />} />
          <Route path="/PhysicsGradeDetails/:id" element={<PhysicsGradeDetails />} />
          <Route path="/ChemistryGradeDetails/:id" element={<ChemistryGradeDetails />} />
          
          <Route path="/MathGradeDetails/:id" element={<MathGradeDetails />} />

          
         
    </Routes>
  </>
  );
}

export default App;
