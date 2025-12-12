import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import SignIn from "./components/SignIn";

function App() {
  // Check if the user already saw the loader
  const firstLoad = sessionStorage.getItem("loaded");

  return (
    <BrowserRouter>
      <Routes>
        {/* Always start at loader if first load */}
        <Route
          path="/"
          element={!firstLoad ? <LoadingScreen /> : <Navigate to="/signin" />}
        />

        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
