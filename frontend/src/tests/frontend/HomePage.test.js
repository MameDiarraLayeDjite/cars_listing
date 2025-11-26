import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../components/Public/HomePage.js';
import api from '../../api/api.js';

jest.mock('../../api/api.js');

const mockCars = [
  {
    id: 1,
    year: 2018,
    make: 'Honda',
    model: 'Civic',
    series: 'EX',
    mileage: 25000,
    location_city: 'Lyon',
    location_branch: 'Est',
    sale_price: 18000,
    stock_number: 'ABC123',
    vin: 'VIN123',
    transmission: 'Manuelle',
    fuel_type: 'Essence',
    cylinders: 4,
    photos: ['https://picsum.photos/200/100?1'],
  },
];

describe('HomePage component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders car list and details link', async () => {
    api.get.mockResolvedValue({ data: mockCars });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Chargement des voitures/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/2018 Honda Civic EX/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Kilométrage : 25 000 km/i)).toBeInTheDocument();
    expect(screen.getByText(/Lyon \/ Est/i)).toBeInTheDocument();
    expect(screen.getByText('Détails')).toBeInTheDocument();

    const detailsLink = screen.getByRole('link', { name: /Détails/i });
    expect(detailsLink).toHaveAttribute('href', '/cars/1');
  });

  test('shows error message on fetch failure', async () => {
    api.get.mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors du chargement des voitures/i)).toBeInTheDocument();
    });
  });
});
