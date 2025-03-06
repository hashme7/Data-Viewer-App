import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-gray-100">
        <Header/>
        <div className="flex flex-col flex-1">
          <Sidebar />
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
