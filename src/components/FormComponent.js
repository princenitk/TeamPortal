import { useState, useRef, useEffect } from "react";
import axios from "axios";
import '../styles/form.css';

const FormComponent = ({ employee, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departmentName: "",
    project: "",
    phoneNumber: "",
    qualification: "",
    dateOfJoining: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        departmentName: employee.department,
        project: employee.project,
        phoneNumber: employee.phone,
        qualification: employee.qualification,
        dateOfJoining: employee.dateOfJoining,
        salary: employee.salary,
      });
    }
  }, [employee]);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isValidPhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const isValidSalary = (salary) => salary > 1000 && salary <= 1000000;
  const isValidName = (value) => /^[A-Za-z\s]+$/.test(value);
  const isValidDateOfJoining = (date) => date <= new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && isNaN(value)) return;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => validateField(name, value), 500);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!isValidName(value)) {
          newErrors.name = "Name should contain only alphabets";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!isValidEmail(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "phoneNumber":
        if (!isValidPhoneNumber(value)) {
          newErrors.phoneNumber = "Phone number must be 10 digits";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case "salary":
        if (!isValidSalary(value)) {
          newErrors.salary = "Enter a valid salary between 1000 and 1,000,000";
        } else {
          delete newErrors.salary;
        }
        break;
      case "dateOfJoining":
        if (!isValidDateOfJoining(value)) {
          newErrors.dateOfJoining = "Date of joining cannot be in the future";
        } else {
          delete newErrors.dateOfJoining;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const emptyFields = Object.values(formData).some(value => value === "");
    return Object.keys(errors).length === 0 && !emptyFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (employee) {
          // Update existing employee
          await axios.put(`http://localhost:5000/api/employees/${employee.id}`, formData);
          onUpdate({ ...employee, ...formData });
        } else {
          // Add new employee
          await axios.post("http://localhost:5000/api/employees", formData);
        }
        alert("Form Submitted Successfully!");
        setFormData({
          name: "",
          email: "",
          departmentName: "",
          project: "",
          phoneNumber: "",
          qualification: "",
          dateOfJoining: "",
          salary: "",
        });
        setErrors({});
        onCancel();  // Close form after submission
      } 
      catch (error) {
        console.error("Error submitting form data:", error);
        alert("Failed to submit form data");
      }
    } else {
      alert("Please correct the errors before submitting the form.");
    }
  };

  return (
    <div className="form-container">
      <h2>{employee ? "Update Employee" : "Employee Form"}</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label>Department:</label>
          <input
            type="text"
            name="departmentName"
            value={formData.departmentName}
            placeholder="Enter your department"
            onChange={handleChange}
          />
           {errors.departmentName && <div className="error">{errors.departmentName}</div>}
        </div>

        <div>
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={formData.project}
            placeholder="Enter your project name"
            onChange={handleChange}
          />
           {errors.project && <div className="error">{errors.project}</div>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleChange}
            title="Please enter a 10-digit phone number"
          />
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
        </div>

        <div>
          <label>Qualification:</label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          >
            <option value="">Select Qualification</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
          {errors.qualification && <div className="error">{errors.qualification}</div>}
        </div>

        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
          {errors.dateOfJoining && <div className="error">{errors.dateOfJoining}</div>}
        </div>

        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            placeholder="Enter monthly salary"
            onChange={handleChange}
          />
          {errors.salary && <div className="error">{errors.salary}</div>}
        </div>

        <button className= "form_btn" type="submit" disabled={!validateForm()}>
          Submit
        </button>
        <button className= "form_btn" type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default FormComponent;