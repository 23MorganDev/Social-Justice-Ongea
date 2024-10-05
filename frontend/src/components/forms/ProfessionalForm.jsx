import React, { useState } from "react";
import UseOptimistic from "./hooks/UseOptimistic";
import configPath from "../paths/configPaths";

const ProfessionalForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    service: "",
    description: "",
    contactInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [optimisticState, setOptimisticState] = UseOptimistic(
    [],
    (state, newData) => [...state, newData]
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Optimistically update the UI with the form data
    setOptimisticState({
      username: formData.username,
      service: formData.service,
      description: formData.description,
      contactInfo: formData.contactInfo,
    });

    try {
      // Send data to the backend using fetch
      const response = await fetch(
       `${configPath.BACKEND_BASE_URL}/${configPath.ENDPOINTS.PROFESSIONALFORM}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data!");
      }

      // Reset form data upon successful submission
      setFormData({
        username: "",
        service: "",
        description: "",
        contactInfo: "",
      });
    } catch (error) {
      // Handle failure
      setError("Error occurred when trying to submit data. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submit Your Professional Service</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Services:</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.button }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#FF5733")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          {loading ? "Submitting ..." : "Submit"}
        </button>
      </form>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

// Basic styling for the form
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#FF5733", // Change on hover
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
};

export default ProfessionalForm;
