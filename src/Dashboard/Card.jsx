import React from "react";

const baseStyle = {
  marginBottom: "0",
};

const styles = {
  baseStyle,
  card: {
    width: "300px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    backgroundColor: "#333",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    ...baseStyle,
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    borderBottom: "1px solid #555",
    backgroundColor: "#222",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  content: {
    ...baseStyle,
    padding: "12px",
    fontSize: "24px",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    ...baseStyle,
    width: "100%",
    padding: "12px",
    backgroundColor: "#3498db",
    color: "#fff",
    textAlign: "center",
    border: "none",
    borderRadius: "0 0 8px 8px",
    cursor: "pointer",
  },
};

function Card({ title, content, imageUrl, buttonText }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.header }}>{title}</div>
      {imageUrl && <img src={imageUrl} alt="Card Image" style={styles.image} />}
      <div style={{ ...styles.content }}>
        <strong style={{ fontSize: "72px" }}>{content}</strong>
      </div>
      <button style={styles.button}>{buttonText}</button>
    </div>
  );
}

export default Card;
