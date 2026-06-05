import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  useEffect(() => {
    const theme =
      localStorage.getItem("theme") || "dark";

    document.body.className = theme;
  }, []);

  return (
    <>
      <Toaster position="bottom-right" />
      <AppRoutes />
    </>
  );
};

export default App;