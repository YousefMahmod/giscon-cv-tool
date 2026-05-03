import { useEffect } from "react";
import { AppRoutes } from "./routes";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/navigation";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return <AppRoutes />;
}

export default App;
