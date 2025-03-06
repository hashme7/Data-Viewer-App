import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-white">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
