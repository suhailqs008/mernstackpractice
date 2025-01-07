import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import AdmissionsTable from "./components/AdmissionsTable";
import AdmissionForm from "./components/AdmissionForm";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import FeesPage from "./pages/FeesPage";
import FeesRecord from "./pages/FeesRecord";
import Homepage from "./pages/Homepage";
import ClassOne from "./pages/Classes/ClassOne";
import ClassTwo from "./pages/Classes/ClassTwo";
import ClassThree from "./pages/Classes/ClassThree";
import ClassFive from "./pages/Classes/ClassFive";
import ClassSix from "./pages/Classes/ClassSix";
import ClassSeven from "./pages/Classes/ClassSeven";
import ClassFour from "./pages/Classes/ClassFour";
import Buses from "./pages/Buses";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Sidebar />}>
            <Route path="admissionform" element={<AdmissionForm />} />
            <Route path="admissiondata" element={<AdmissionsTable />} />
            <Route path="feerecord" element={<FeesRecord />} />
            <Route path="class-1" element={<ClassOne />} />
            <Route path="class-2" element={<ClassTwo />} />
            <Route path="class-3" element={<ClassThree />} />
            <Route path="class-4" element={<ClassFour />} />
            <Route path="class-5" element={<ClassFive />} />
            <Route path="class-6" element={<ClassSix />} />
            <Route path="class-7" element={<ClassSeven />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="buses" element={<Buses />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
