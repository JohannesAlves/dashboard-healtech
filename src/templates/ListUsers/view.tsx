'use client';

import Navbar from '@/components/Navbar';
import { Box, Grid, Typography } from '@mui/material';

import UsersTable from '@/components/UsersTable';
import { SearchBar } from '@/components/SearchBar';
import { OrderBy } from '@/components/OrderBy';
import { Filters } from '@/components/Filters';
import useListUsersTemplate from './model';

const ListUsersTemplateView = ({
  columns,
  handleUser,
  inputRef,
  setTerm,
  term,
  orderBy,
  setOrderBy,
  selectedFilters,
  setSelectedFilters,
  filteredData,
}: ReturnType<typeof useListUsersTemplate>) => {
  return (
    <Grid sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ color: '#515151', padding: 5 }}>
        <Typography variant="h5" component="h5">
          Usuários
        </Typography>

        <Box sx={{ maxWidth: 600, mt: 5, display: 'flex', gap: 2 }}>
          <SearchBar
            ref={inputRef}
            placeholder="Pesquisar ID ou nome ou telefone..."
            onChange={(event) => setTerm(event.target.value)}
            keyword={term}
          />

          <OrderBy setValue={setOrderBy} value={orderBy} />
          <Filters
            columns={columns}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Box>
      </Box>

      <Box
        sx={{
          padding: 3,
        }}
      >
        <UsersTable columns={columns} users={filteredData || []} handleUser={handleUser} />
      </Box>
    </Grid>
  );
};

export default ListUsersTemplateView;
