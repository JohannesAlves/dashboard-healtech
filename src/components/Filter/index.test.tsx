import {
  fireEvent,
  queryByAttribute,
  render,
  waitFor,
} from '@testing-library/react';
import Filter from '.';
import { COLUMN_MOCK } from './mock';

describe('<Filter />', () => {
  let onRemoveMock: jest.Mock;
  let setSelectedFiltersMock: jest.Mock;

  beforeEach(() => {
    onRemoveMock = jest.fn();
    setSelectedFiltersMock = jest.fn();
  });

  it('should call onRemove when remove button is clicked', () => {
    const { getByTestId } = render(
      <Filter
        columns={COLUMN_MOCK}
        onRemove={onRemoveMock}
        setSelectedFilters={setSelectedFiltersMock}
        index={0}
      />
    );

    const removeButton = getByTestId('remove-button');
    fireEvent.click(removeButton);

    expect(onRemoveMock).toHaveBeenCalled();
  });

  it('should update search param after delay', async () => {
    const { getByLabelText } = render(
      <Filter
        columns={COLUMN_MOCK}
        index={0}
        setSelectedFilters={setSelectedFiltersMock}
        onRemove={onRemoveMock}
      />
    );
    const searchInput = getByLabelText(/valor/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(
      () => {
        expect(searchInput.value).toBe('test');
      },
      { timeout: 600 }
    ); // Defina um timeout maior que o delay para garantir que o teste passe
  });
});
