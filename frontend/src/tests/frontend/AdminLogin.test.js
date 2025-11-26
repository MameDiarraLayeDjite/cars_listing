import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from '../../components/Admin/AdminLogin.js';
import api from '../../api/api.js';
import { AuthProvider } from '../../context/AuthContext.js';

jest.mock('../../api/api.js');

describe('AdminLogin component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('successful login redirects to dashboard', async () => {
    api.post.mockResolvedValue({ data: { token: 'fake-jwt-token' } });

    const { container } = render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/admin/login']}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    await waitFor(() => {
      expect(screen.queryByText(/connexion administrateur/i)).not.toBeInTheDocument();
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });

  test('shows error on failed login', async () => {
    api.post.mockRejectedValue({
      response: { data: { message: 'Nom d\'utilisateur ou mot de passe incorrect' } },
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/admin/login']}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/incorrect/i);
    });
  });

  test('shows error if fields are empty', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminLogin />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/Veuillez remplir tous les champs/i);
  });
});
