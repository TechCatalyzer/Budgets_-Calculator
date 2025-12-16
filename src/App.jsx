import { BrowserRouter, Routes, Route } from "react-router-dom";
import JourneyDetails from "./pages/JourneyDetails";
import LoadingScreen from "./Pages/LoadingScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingScreen />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/results" element={<Results />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/journey-details" element={<JourneyDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
