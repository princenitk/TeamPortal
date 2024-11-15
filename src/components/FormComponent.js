import {useState} from "react"
import axios from 'axios'
const FormComponent = ()=>{
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        departmentName:"",
        project:"",
        phoneNumber:"",
        qualification:"",
        dateOfJoining:"",
        salary:"",

    });
    const handleChange=(e)=>{
        const {name, value}=e.target
        setFormData({...formData,
            [name]: value,
    })
    };
    const [errors,setErrors]=useState({});
    const isValidEmail=(email)=>{
        const emailRegex= /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    }
    const isValidPhoneNumber=(phoneNumber)=>{
        const phoneRegex=/^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    const validateForm=()=>{
        let newErrors={};
        if(!formData.name){
            newErrors.name="Name is required";
        }
        if(!formData.email){
            newErrors.email="Email is required";
        }else if(!isValidEmail(formData.email)){
            newErrors.email="Invalid email Format";
        }
        if(!formData.phoneNumber){
            newErrors.phoneNumber="Phone number is required";
        }else if(!isValidPhoneNumber(formData.phoneNumber)){
            newErrors.phoneNumber="Phone number must be 10 digits";
        }
        if(!formData.departmentName){
            newErrors.departmentName="Department name is required";
        }
        if(!formData.project){
            newErrors.project="required field";
        }
        if(!formData.qualification){
            newErrors.qualification="required field";
        }
        if(!formData.salary){
            newErrors.salary="required field";
        }
        if(!formData.dateOfJoining){
            newErrors.dateOfJoining="required field";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
          try {
            // POST request to add employee data
            await axios.post('http://localhost:3001/employees', formData);
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
          } catch (error) {
            console.error("Error submitting form data:", error);
            alert("Failed to submit form data");
          }
        } else {
          console.log('Form Validation Failed');
        }
      };
    return (
    <>
    <h2>Employee Form</h2>
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
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleChange}
            />
             {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
        </div>
        <div>
            <label>Qualification:</label>
            <select name="qualification" value={formData.qualification} onChange={handleChange}>
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
            placeholder="Enter your date of joining"
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
            placeholder="Enter your salary"
            onChange={handleChange}
            />
             {errors.salary && <div className="error">{errors.salary}</div>}
        </div>
        <button type="submit">Submit</button>
    </form>
    </>
      );
    
    };
    export default FormComponent;