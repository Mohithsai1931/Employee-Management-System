import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() 
{
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    doj: '',
    dept: {
      deptName: '',
      designation: ''
    }
  });

  const [errors, setErrors] = useState({
    name: '',
    doj: '',
    deptName: '',
    designation: ''
  });

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/employees");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'doj') {
      setEmployee({ ...employee, [name]: value });
    } else {
      setEmployee({
        ...employee,
        dept: {
          ...employee.dept,
          [name]: value,
        },
      });
    }
  };
    
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const validateForm = () => {
    const tempErrors = {};
    let isValid = true;

    // Validate Name
    if (!employee.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    // Validate Date of Joining (DOJ)
    if (!employee.doj) {
      tempErrors.doj = "Date is required";
      isValid = false;
    }

    // Validate Department Name
    if (!employee.dept.deptName) {
      tempErrors.deptName = "Department Name is required";
      isValid = false;
    } 

    // Validate Designation
    if (!employee.dept.designation) {
      tempErrors.designation = "Designation is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }

  const saveHandle = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert the date to dd-MM-yyyy format
      const formattedDate = formatDate(employee.doj);

      // Create a new employee object with the formatted date
      const employeeData = { 
        ...employee, 
        doj: formattedDate 
      };

      console.log("Form is valid, submitting:", JSON.stringify(employeeData));

      EmployeeService.createEmployee(employeeData).then((res) => {
        navigate("/employees");
      });
    } else {
      console.log("Form is invalid");
    }
  }

  return (
    <div className="cotainer mt-3">
      <div className="card col-md-6 offset-3">
        <h4 className="text-center pt-3">Add Employee</h4>

        <div className="card-body">
          <form>
            <label className="mb-1">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={employee.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}

            <label className="my-1">DOJ:</label>
            <input
              type="date"
              name="doj"
              id="doj"
              className="form-control"
              value={employee.doj}
              onChange={handleChange}
            />
            {errors.doj && <div className="text-danger">{errors.doj}</div>}

            <label className="my-1">Department:</label>
            <input
              type="text"
              name="deptName"
              id="deptName"
              className="form-control"
              value={employee.dept.deptName}
              onChange={handleChange}
            />
            {errors.deptName && <div className="text-danger">{errors.deptName}</div>}

            <label className="my-1">Designation:</label>
            <input
              type="text"
              name="designation"
              id="designation"
              className="form-control"
              value={employee.dept.designation}
              onChange={handleChange}
            />
            {errors.designation && <div className="text-danger">{errors.designation}</div>}

            <button className="btn btn-danger mt-2" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-success mt-2 ms-3" onClick={saveHandle}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;

