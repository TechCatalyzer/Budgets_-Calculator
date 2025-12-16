import { BrowserRouter, Routes, Route } from "react-router-dom";
import JourneyDetails from "./pages/JourneyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JourneyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
