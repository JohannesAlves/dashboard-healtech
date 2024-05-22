import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from '.';

it('should be SearchBar renders correctly', () => {
  const placeholderText = 'Search...';
  const keyword = '';
  const onChangeMock = jest.fn();

  const { getByPlaceholderText } = render(
    <SearchBar
      onChange={onChangeMock}
      keyword={keyword}
      placeholder={placeholderText}
    />
  );

  expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText(placeholderText), {
    target: { value: 'teste' },
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
