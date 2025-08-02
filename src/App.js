import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/shared/ThemeProvider';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard'; // [REHAB] أضفت الداشبورد
import './App.css';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/service" element={<ServicePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;