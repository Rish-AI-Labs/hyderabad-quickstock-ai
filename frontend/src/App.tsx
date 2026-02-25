import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Forecasting from './pages/Forecasting';
import AIIntelligence from './pages/AIIntelligence';
import Analytics from './pages/Analytics';
import BusinessDocs from './pages/BusinessDocs';
import DevDocs from './pages/DevDocs';
import Layout from './components/Layout';

// Guard: redirect to /login if not authenticated
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/forecasting" element={<Forecasting />} />
                <Route path="/Intelligence" element={<AIIntelligence />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/docs/business" element={<BusinessDocs />} />
                <Route path="/docs/dev" element={<DevDocs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
