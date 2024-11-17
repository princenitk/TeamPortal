import axios from 'axios';
const URL = process.env.SERVER_URL || 'http://localhost:5000/api/employees';;


export const getEmployees = async () =>{
    try{
        const response = await axios.get(URL);
        return response.data.employees;
    }
    catch(error){
        console.error(error);
        return [];
    }
};

export const deleteEmployee = async (id) => {
    try {
   
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        
        if (response.ok) {
            const data = await response.json();
            console.log("Employee deleted successfully:", data);
            return id;  
        } else {
            const errorData = await response.json();
            console.error("Failed to delete:", errorData.message);
            throw new Error(errorData.message);
        }
    } catch (err) {
        console.error("Failed to delete:", err);
        throw err; 
    }
};

