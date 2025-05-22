export const logToFile = (message: string) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message}\n`;

  console.log(logEntry);

  try {
    const existingLogs = localStorage.getItem("appLogs") || "";
    localStorage.setItem("appLogs", existingLogs + logEntry);
  } catch (error) {
    console.error("Failed to save log:", error);
  }
};
