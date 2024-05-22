import { fireEvent, render, screen } from '@testing-library/react';
import { COLUMN_MOCK } from '../Filter/mock';
import { Filters } from '.';
import { ISelectedFilters } from '@/templates/ListUsers';

const setSelectedFilters = jest.fn();
const mockSelectedFilters: ISelectedFilters[] = [
  {
    index: 0,
    selectedColumn: { field: 'id', headerName: 'ID', type: 'textField' },
    selectedComparator: 'and',
    selectedOperator: { operator: 'or' },
    searchParam: '',
  },
];

describe('<Filters />', () => {
  it('should be render Filters component correctly', () => {
    render(
      <Filters
        columns={COLUMN_MOCK}
        selectedFilters={mockSelectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );

    expect(screen.getByText(/filtros/i)).toBeInTheDocument();
  });

  it('should be adds a new filter when "Adicionar Filtro" button is clicked', () => {
    render(
      <Filters
        columns={COLUMN_MOCK}
        selectedFilters={mockSelectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );
    const btnFilters = screen.getByText(/filtros/i);

    fireEvent.click(btnFilters);

    fireEvent.click(screen.getByText(/Adicionar Filtro/i));
    expect(setSelectedFilters).toHaveBeenCalled();
  });

  it('should be removes a specific filter when remove button is clicked', () => {
    render(
      <Filters
        columns={COLUMN_MOCK}
        selectedFilters={mockSelectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );
    const btnFilters = screen.getByText(/filtros/i);
    fireEvent.click(btnFilters);

    fireEvent.click(screen.getByText(/Adicionar Filtro/i));

    const removeButtons = screen.getAllByText(/Remover/i);
    fireEvent.click(removeButtons[0]);

    expect(screen.getAllByText('Adicionar Filtro').length).toBe(1);
  });

  it('should be removes all filters when "Remover todos" button is clicked', () => {
    render(
      <Filters
        columns={COLUMN_MOCK}
        selectedFilters={mockSelectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );

    const btnFilters = screen.getByText(/filtros/i);
    fireEvent.click(btnFilters);

    fireEvent.click(screen.getByText(/Adicionar Filtro/i));
    fireEvent.click(screen.getByText(/Adicionar Filtro/i));

    expect(setSelectedFilters).toHaveBeenCalledTimes(8);

    fireEvent.click(screen.getByText(/Remover todos/i));

    expect(screen.getAllByText('Adicionar Filtro').length).toBe(1);
  });

  it('should be opens and closes the menu when "Filtros" button is clicked', () => {
    render(
      <Filters
        columns={COLUMN_MOCK}
        selectedFilters={mockSelectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    const btnFilters = screen.getByText(/filtros/i);

    fireEvent.click(btnFilters);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/remover todos/i));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
