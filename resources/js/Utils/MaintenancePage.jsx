const MaintenancePage = () => {
    // Inline styles for the professional maintenance page
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
            fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
            textAlign: "center",
            color: "#2d3748",
        },
        card: {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.02)",
            padding: "40px",
            maxWidth: "550px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        logo: {
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#ebf4ff",
        },
        icon: {
            fontSize: "32px",
            color: "#3182ce",
        },
        title: {
            fontSize: "28px",
            fontWeight: "600",
            color: "#1a202c",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
        },
        divider: {
            width: "60px",
            height: "4px",
            backgroundColor: "#3182ce",
            borderRadius: "2px",
            margin: "0 auto 24px",
        },
        message: {
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#4a5568",
            marginBottom: "30px",
            maxWidth: "400px",
        },
        progressContainer: {
            width: "100%",
            height: "6px",
            backgroundColor: "#edf2f7",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "30px",
        },
        progressBar: {
            height: "100%",
            backgroundImage:
                "linear-gradient(to right, #3182ce, #63b3ed, #3182ce)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
        },
        footer: {
            marginTop: "30px",
            fontSize: "14px",
            color: "#718096",
        },
        contact: {
            marginTop: "20px",
            fontSize: "14px",
            color: "#4a5568",
        },
        email: {
            color: "#3182ce",
            textDecoration: "none",
            fontWeight: "500",
        },
    };

    // Add keyframes for the progress bar animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
    document.head.appendChild(styleSheet);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logo}>
                    <div style={styles.icon}>⚙️</div>
                </div>

                <h1 style={styles.title}>Página en Mantenimiento</h1>

                <div style={styles.divider}></div>

                <p style={styles.message}>
                    Estamos actualizando nuestra web para mejorar su
                    experiencia. Gracias por su paciencia.
                </p>

                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}></div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
