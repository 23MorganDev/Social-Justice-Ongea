import React, { useState } from "react";
import UseOptimistic from "./hooks/UseOptimistic";
import configPath from "../paths/configPaths";

const UserForm = () => {
  const [FormData, setFormData] = useState({
    username: "",
    title: "",
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
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Optimistically update the UI with the form data
    setOptimisticState({
      username: FormData.username,
      title: FormData.title,
      description: FormData.description,
      contactInfo: FormData.contactInfo,
    });

    try {
      // Send data to the backend using fetch
      const response = await fetch(`${configPath.BACKEND_BASE_URL}/${configPath.ENDPOINTS.VICTIMFORM}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data!");
      }

      // Reset form data upon successful submission
      setFormData({
        username: "",
        title: "",
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
      <h2 style={styles.heading}>Submit Your Case</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="username"
            value={FormData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Case Title:</label>
          <input
            type="text"
            name="title"
            value={FormData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description Of The Issue:</label>
          <input
            type="text"
            name="description"
            value={FormData.description}
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
            value={FormData.contactInfo}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
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

// Styling for the form
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
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
};

export default UserForm;
