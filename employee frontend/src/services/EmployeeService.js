import axios from 'axios';
const EMPLOYEE_BASE_API="http://localhost:9090/api/v1/employees";
class EmployeeService
{
    createEmployee(employee)
    {
       return axios.post(EMPLOYEE_BASE_API,employee);
    }
    getAllEmployees()
    {
        return axios.get(EMPLOYEE_BASE_API);
    }
    getEmployeeById(employeeId)
    {
        return axios.get(EMPLOYEE_BASE_API+'/'+employeeId);
    }
    updateEmployee(employeeId,employee)
    {
        return axios.put(EMPLOYEE_BASE_API+'/'+employeeId,employee);
    }

    deleteEmployee(employeeId)
    {
        return axios.delete(EMPLOYEE_BASE_API+'/'+employeeId);
    }
}
export default new EmployeeService();
