import { TextField } from '@mui/material';
import { forwardRef, ForwardRefRenderFunction } from 'react';

export interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  keyword: string | undefined;
  placeholder?: string;
}

const SearchBarBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SearchBarProps
> = ({ onChange, keyword, placeholder }, ref) => {
  return (
    <TextField
      inputRef={ref}
      value={keyword}
      sx={{ width: 350 }}
      inputProps={{ style: { fontSize: 20 } }} // font size of input text
      placeholder={placeholder}
      size="small"
      variant="outlined"
      onChange={onChange}
    />
  );
};

export const SearchBar = forwardRef(SearchBarBase);
