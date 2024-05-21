import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { debounce } from '@mui/material/utils';
import { SearchBar } from '../SearchBar';
import CustomToolbar from './CustomToolbar';

export default function UsersDataGrid({ columns, rows }: any) {
  const [searchValue, setSearchValue] = React.useState('');

  const apiRef = useGridApiRef();

  const updateSearchValue = React.useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(' ').filter((term: string) => term !== '')
      );
    }, 500);
  }, [apiRef]);

  function handleSearchValueChange(event: any) {
    const newValue = event.target.value;
    setSearchValue(newValue);
    updateSearchValue(newValue);
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <SearchBar
          keyword={searchValue}
          onChange={handleSearchValueChange}
          placeholder="Pesquisar ID..."
        />
      </Grid>

      <Grid item>
        {/* The box bellow it's the filter panel. */}
        <Box id="filter-panel"></Box>
      </Grid>
      <Grid item style={{ height: '100%', width: '100%' }}>
        <DataGridPro
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
