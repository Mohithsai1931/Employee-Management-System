import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import EmployeeListComponent from "./components/EmployeeListComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { Routes, Route } from 'react-router-dom';
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";

function App() {
  return (
    <div className="bg-color">
      <HeaderComponent />

      <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<EmployeeListComponent />} />
          <Route path="/employees" element={<EmployeeListComponent />} />
          <Route path="/add-employee" element={<CreateEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
        </Routes>
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
