import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div className="app">
  <Router>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
    </Routes>
  </Router>
</div>
  );
}

export default App;
