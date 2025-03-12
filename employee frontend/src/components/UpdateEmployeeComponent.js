import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function UpdateEmployeeComponent()
{
    let navigate = useNavigate();

    const [name,setName]=useState("");
    const [doj,setDoj]=useState("");
    const [department,setDepartment]=useState({deptName:"", designation:""});
    const {id}=useParams();

    useEffect(()=>{

            EmployeeService.getEmployeeById(id).then(res=>{
                setName(res.data.name);
                setDoj(res.data.doj);
                setDepartment({
                    deptName:res.data.dept.deptName,
                    designation:res.data.dept.designation
                })
            })
    },[])

    const updateHandler=(e)=>{
        
        e.preventDefault();

        const updatedHandler={
            name,
            doj,
            dept:{
                deptName : department.deptName,
                designation :department.designation
            }
        }

        EmployeeService.updateEmployee(id,updatedHandler).then(res=>{
            navigate("/employees");
        })
    }

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate('/employees');
    }

    return (
        <div className="cotainer mt-3">
      <div className="card col-md-6 offset-3">
        <h4 className="text-center pt-3">Update Employee</h4>

        <div className="card-body">
          <form>
            <label className="mb-1">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={name}
              onChange={(e)=> setName(e.target.value) }
            />
            

            <label className="my-1">DOJ:</label>
            <input
              type="text"
              name="doj"
              id="doj"
              className="form-control"
              value={doj}
              onChange={(e)=> setDoj(e.target.value)}
            />
           

            <label className="my-1">Department:</label>
            <input
              type="text"
              name="deptName"
              id="deptName"
              className="form-control"
              value={department.deptName}
              onChange={(e)=> setDepartment({...department,deptName:e.target.value})}
            />
            
            <label className="my-1">Designation:</label>
            <input
              type="text"
              name="designation"
              id="designation"
              className="form-control"
              value={department.designation}
              onChange={(e)=> setDepartment({...department,designation:e.target.value})}
            />
           

            <button className="btn btn-danger mt-2" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-success mt-2 ms-3" onClick={updateHandler} >Save</button>
          </form>
        </div>
      </div>
    </div>
    )
}
export default UpdateEmployeeComponent;

















