/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Inmates from './components/Inmates';
import Incidents from './components/Incidents';
import Staff from './components/Staff';
import Cells from './components/Cells';
import Medical from './components/Medical';
import Login from './components/Login';
import { UserRole } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('prison_guard_user');
    return !!saved;
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<{ name: string; role: UserRole } | null>(() => {
    const saved = localStorage.getItem('prison_guard_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (employeeId: string, password: string) => {
    setLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('prison_guard_user', JSON.stringify(userData));
      } else {
        const error = await response.json();
        setLoginError(error.error || 'Błąd logowania');
      }
    } catch (err) {
      setLoginError('Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
    localStorage.removeItem('prison_guard_user');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} loading={loading} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inmates':
        return <Inmates />;
      case 'incidents':
        return <Incidents />;
      case 'staff':
        return <Staff />;
      case 'cells':
        return <Cells />;
      case 'medical':
        return <Medical />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <h2 className="text-2xl font-bold mb-2">Moduł w budowie</h2>
            <p>Ta funkcja będzie dostępna wkrótce.</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      role={user?.role || 'GUARD'} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout}
      userName={user?.name || 'Użytkownik'}
    >
      {renderContent()}
    </Layout>
  );
}

