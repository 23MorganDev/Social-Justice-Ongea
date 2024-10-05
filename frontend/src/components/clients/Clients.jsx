import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import configPath from '../paths/configPaths';

const Clients = () => {
    const [cases, setCases] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
  
    // Fetching the data from the backend
    useEffect(() => {
      const fetchCases = async () => {
        try {
          const response = await fetch(`${configPath.BACKEND_BASE_URL}/${configPath.ENDPOINTS.VICTIMS}`); 
          const data = await response.json();
  
          if (response.ok) {
            setCases(data); // Set the cases state with the fetched data
          } else {
            throw new Error("Failed to fetch cases");
          }
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchCases(); // Call the function to fetch the cases on component mount
    }, []);

    
  // Navigate to ProfessionalForm when button is clicked
  const goToUserForm = () => {
    navigate("/user-form");
  };
  
    return (
      <div style={styles.container}>
        <h1>Victims' Cases</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
               {/* Add a button to navigate to the ProfessionalForm */}
      <button style={styles.button} onClick={goToUserForm}>
        Enter Your Case
      </button> 
        </div>
        <div style={styles.cardContainer}>
          {cases.length > 0 ? (
            cases.map((victimCase) => (
              <div key={victimCase._id} style={styles.card}>
                <h2>Name:{victimCase.username}</h2>
                <h3>Case:{victimCase.title}</h3>
                <p>Description Of The Case:{victimCase.description}</p>
                <p>Contact Info: {victimCase.contactInfo}</p>
              </div>
            ))
          ) : (
            <p>No cases to display</p>
          )}
        </div>
      </div>
    );
  };
  
  // Basic CSS in JS for container and card styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "300px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "blue",
      color: "#fff",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
      transition: "background-color 0.3s ease",
    },
  };
  

export default Clients