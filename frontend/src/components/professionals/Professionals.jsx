import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configPath from "../paths/configPaths";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //initaializing navigate

  // Fetch professionals from the backend
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(
          `${configPath.BACKEND_BASE_URL}/${configPath.ENDPOINTS.PROFESSIONAL}`
        );
        const text = await response.text(); //fecth he response as text first

        console.log("Response text:", text);

        if (response.ok) {
          const data = JSON.parse(text); // Parse JSON after checking response status
          setProfessionals(data);
        } else {
          throw new Error("Failed to fetch professionals");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfessionals(); // Call the function to fetch professionals on component mount
  }, []);

  // Navigate to ProfessionalForm when button is clicked
  const goToProfessionalForm = () => {
    navigate("/professional-form");
  };

  return (
    <div style={styles.container}>
      <h1>Available Professionals</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {/* Add a button to navigate to the ProfessionalForm */}
        <button style={styles.button} onClick={goToProfessionalForm}>
          Enter Your Professional Details
        </button>
      </div>
      <div style={styles.cardContainer}>
        {professionals.length > 0 ? (
          professionals.map((professional) => (
            <div key={professional._id} style={styles.card}>
              <h2>{professional.username}</h2>
              <h3>Service: {professional.service}</h3>
              <p>{professional.description}</p>
              <p>Contact Info: {professional.contactInfo}</p>
            </div>
          ))
        ) : (
          <p>No professionals available</p>
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

export default Professionals;
