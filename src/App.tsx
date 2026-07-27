import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import QuotesList from './pages/QuotesList';
import CreateQuote from './pages/CreateQuote';
import InvoicesList from './pages/InvoicesList';
import PaymentsList from './pages/PaymentsList';
import History from './pages/History';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ClientView from './pages/ClientView';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes Marchand (Connecté) */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quotes" element={<QuotesList />} />
          <Route path="quotes/new" element={<CreateQuote />} />
          <Route path="invoices" element={<InvoicesList />} />
          <Route path="payments" element={<PaymentsList />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Route Publique (Vue Client) */}
        <Route path="/client/quote/:id" element={<ClientView />} />
      </Routes>
    </Router>
  );
}

export default App;
