import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Contact from './components/Contact';
import SubPage from './components/SubPage';
import Projects from './components/Projects';
import NewsPage from './components/NewsPage';
import SantePage from './components/SantePage';
import CulturePage from './components/CulturePage';
import Services from './components/Services';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ padding: '8px', background: 'white', color: '#000', textAlign: 'center' }}>APP OK</div>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/compte"    element={<UserDashboard />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/admin"     element={<AdminDashboard />} />
            <Route path="/contact"   element={<Contact />} />
            
            {/* Sub-pages with custom colors and content */}
            <Route 
              path="/demarches" 
              element={
                <SubPage 
                  title="Démarches Administratives" 
                  subtitle="Tous les services en ligne pour simplifier vos démarches du quotidien." 
                  apiEndpoint="/demarches"
                  heroColor="#0d4a3e"
                  heroAccent="#14b8a6"
                />
              } 
            />
            <Route path="/projet" element={<Projects />} />
            <Route path="/projet/:id" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/actualites" element={<NewsPage />} />
            <Route path="/culture"    element={<CulturePage />} />
            <Route path="/solidarite" element={<SantePage />} />
            <Route path="/sante"      element={<SantePage />} />
          </Routes>
        </main>
        {/* Hide Footer on admin routes */}
        <FooterConditional />
      </div>
    </Router>
  );
}

export default App;

function FooterConditional() {
  const location = useLocation();
  // hide footer for admin area and "espace citoyen" pages and their subroutes
  const hideFooterRoutes = ['/admin', '/compte', '/user-login'];
  if (hideFooterRoutes.some((r) => location.pathname.startsWith(r))) return null;
  return <Footer />;
}
