
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeesList from './components/List';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesList />} />
        <Route path="/employee/:emp_id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
