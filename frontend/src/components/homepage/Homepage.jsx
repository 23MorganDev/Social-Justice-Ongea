import React from "react";
import { useNavigate } from "react-router-dom";
import Professionals from "../professionals/Professionals";
import Clients from "../clients/Clients";

const HomePage = () => {
    const navigate = useNavigate();
  
    // Navigation functions for the buttons
    const goToVictimsPage = () => navigate("/clients");
    const goToProfessionalsPage = () => navigate("/professionals");
  
    return (
      <div style={styles.container}>
        <h1 style={styles.logo}>Ongea</h1>
        <p style={styles.message}>When we talk, change happens</p>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "crimson")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "blue")}
            onClick={goToVictimsPage}
          >
            Victims
          </button>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "crimson")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "blue")}
            onClick={goToProfessionalsPage}
          >
            Professionals
          </button>
        </div>
      </div>
    );
  };
  
  // Styling for the component
  const styles = {
    container: {
      backgroundColor: "#FDB813", // Sunset yellow background
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    logo: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    message: {
      fontSize: "1.5rem",
      marginBottom: "40px",
      color: "#555",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
    },
    button: {
      padding: "15px 30px",
      fontSize: "1.2rem",
      backgroundColor: "blue",
      color: "#fff",
      border: "none",
      borderRadius: "25px", // Rounded corners
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };
  
  export default HomePage;
