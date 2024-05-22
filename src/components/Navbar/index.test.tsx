import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '.';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
}));

describe('<Navbar />', () => {
  it('changes the active tab on click', () => {
    render(<Navbar />);
    const clientesButton = screen.getAllByText('Clientes')[0];
    const enderecosButton = screen.getAllByText('Endereços')[0];

    expect(clientesButton).toHaveStyle('color: #9747FF');
    expect(enderecosButton).toHaveStyle('color: #6A6A6A');

    fireEvent.click(enderecosButton);
    expect(clientesButton).toHaveStyle('color: #6A6A6A');
    expect(enderecosButton).toHaveStyle('color: #9747FF');
  });
});
