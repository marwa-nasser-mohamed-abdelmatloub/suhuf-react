import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { ThemeProvider } from './components/shared/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import ProgramsPage from './pages/ProgramsPage';
import AdminProgramsPage from './pages/AdminProgramsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={
                    <CoursesPage />
                } />
                <Route path="/courses/:id" element={
                    <CourseDetailPage />
                } />
                <Route path="/programs" element={
                  <ProgramsPage />
                } />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute adminOnly>
                    <AdminUsersPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/courses" element={
                  <ProtectedRoute adminOnly>
                    <AdminCoursesPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/programs" element={
                  <ProtectedRoute adminOnly>
                    <AdminProgramsPage />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={
                    <AboutPage />
                } />
                <Route path="/service" element={
                    <ServicePage />
                } />
                <Route path="/contact" element={
                    <ContactPage />
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
