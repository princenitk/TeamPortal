import React, { useEffect, useState } from "react";
import '../styles/table.css';
import { getEmployees, deleteEmployee } from "../services/employeeService";
import FormComponent from "./FormComponent";

const tableHeaders = ['Name', 'Email', 'Department', 'Project', 'Contact No', 'Qualification', 'Date of Joining', 'Salary', 'Actions'];

const EmployeeTable = () => {
    const [page, setPage] = useState(0);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployees();
                setEmployee(data);
            } catch (error) {
                setError('Failed to load!');
                console.error(error);
            }
        };
        fetchEmployee();
    }, []);

    const records = 8;
    const currentEmployees = employee.slice(page * records, (page + 1) * records);

    const nextPage = () => {
        if ((page + 1) * records < employee.length) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployee(employee.filter((e) => e.id !== id));
        } catch (error) {
            console.error("Error Occurred!", error);
        }
    };

    const handleEdit = (e) => {
        setSelectedEmployee(e);
    };

    const handleUpdate = (updatedEmployee) => {
        setEmployee(employee.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e)));
        setSelectedEmployee(null); 
    };

    return (
        <div className="table-container">
            {selectedEmployee ? (
                <FormComponent
                    employee={selectedEmployee}
                    onUpdate={handleUpdate}
                    onCancel={() => setSelectedEmployee(null)} 
                />
            ) : (
                <>
                    {error ? (<p>{error}</p>) : (
                        <>
                            <table className="employee-table">
                                <thead>
                                    <tr>
                                        {tableHeaders.map((h, index) => (
                                            <th key={index}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentEmployees.map((e, index) => (
                                        <tr key={index}>
                                            <td>{e.name}</td>
                                            <td>{e.email}</td>
                                            <td>{e.department}</td>
                                            <td>{e.project}</td>
                                            <td>{e.phone}</td>
                                            <td>{e.qualification}</td>
                                            <td>{e.dateOfJoining}</td>
                                            <td>{e.salary}</td>
                                            <td className="action">
                                                <button className="edit-btn" onClick={() => handleEdit(e)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}

            {!selectedEmployee && (
                <div className="page-navigation">
                    <button className="btn" onClick={prevPage} disabled={page === 0}>Previous</button>
                    <button className="btn" onClick={nextPage} disabled={(page + 1) * records >= employee.length}>Next</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeTable;
