import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from '../../components/Admin/AdminDashboard.js';
import api from '../../api/api.js';

jest.mock('../../api/api.js');

const mockCars = [
  {
    id: 1,
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    series: 'XSE',
    mileage: 15000,
    location_city: 'Paris',
    location_branch: 'Nord',
    sale_price: 22000,
    stock_number: 'STK100',
    vin: 'VIN100',
    transmission: 'Automatique',
    fuel_type: 'Essence',
    cylinders: 4,
    photos: ['https://picsum.photos/200/100?10'],
  },
  {
    id: 2,
    year: 2019,
    make: 'Ford',
    model: 'Mustang',
    series: 'GT',
    mileage: 20000,
    location_city: 'Lyon',
    location_branch: 'Sud',
    sale_price: 35000,
    stock_number: 'STK101',
    vin: 'VIN101',
    transmission: 'Manuelle',
    fuel_type: 'Essence',
    cylinders: 8,
    photos: ['https://picsum.photos/200/100?11'],
  },
];

describe('AdminDashboard component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders list of cars', async () => {
    api.get.mockResolvedValue({ data: mockCars });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Chargement des voitures/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Toyota Camry XSE/i)).toBeInTheDocument();
      expect(screen.getByText(/Ford Mustang GT/i)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: /Modifier/i })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /Supprimer/i })).toHaveLength(2);
  });

  test('search filters cars', async () => {
    api.get.mockResolvedValue({ data: [mockCars[0]] });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Toyota Camry XSE/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Recherche par nom/i), {
      target: { value: 'Toyota' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Rechercher/i }));

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/cars', { params: { name: 'Toyota' } });
    });
  });

  test('delete button confirmation and call', async () => {
    api.get.mockResolvedValue({ data: mockCars });
    api.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Toyota Camry XSE/i)).toBeInTheDocument();
    });

    // Click delete on the first car
    const deleteButtons = screen.getAllByTitle(/Supprimer/i);
    fireEvent.click(deleteButtons[0]);

    // Wait for modal
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Supprimer le véhicule ?')).toBeInTheDocument();

    // Click confirm in modal
    const confirmButton = within(dialog).getByRole('button', { name: 'Supprimer' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/cars/1');
    });
  });

  test('delete button cancel does not call API', async () => {
    api.get.mockResolvedValue({ data: mockCars });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Toyota Camry XSE/i)).toBeInTheDocument();
    });

    // Click delete on the first car
    const deleteButtons = screen.getAllByTitle(/Supprimer/i);
    fireEvent.click(deleteButtons[0]);

    // Wait for modal
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click cancel in modal
    const cancelButton = within(dialog).getByRole('button', { name: 'Annuler' });
    fireEvent.click(cancelButton);

    expect(api.delete).not.toHaveBeenCalled();
  });
});
