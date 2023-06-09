import { Card } from "./components/layout/Card";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Forgot } from "./pages/Forgot";
import { Home } from "./pages/Home";
import { PasswordReset } from "./pages/PasswordReset";

function App() {
  return (
    <main className="bg-secondary-light w-full h-full">
      <Card>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password" element={<PasswordReset />} />
          </Routes>
        </Router>
      </Card>
    </main>
  );
}

export default App;
