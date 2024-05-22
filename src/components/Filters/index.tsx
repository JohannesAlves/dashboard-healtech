import { useMenu } from '@/hooks/use-menu';
import { IUsers } from '@/providers/dto/get-all-users-dto';
import { IColumn } from '@/templates/ListUsers/types';
import { Button, Menu, Grid, Box } from '@mui/material';
import React, { SetStateAction, useState } from 'react';
import Filter from '../Filter';

interface IProps {
  rows?: IUsers[];
  columns: IColumn[];
}

export const Filters: React.FC<IProps> = ({ columns }) => {
  const [filters, setFilters] = useState<{ id: string; columns: IColumn[] }[]>([
    { id: '1', columns },
  ]);

  const { handeCloseMenu, handleSelectedMenu, isOpen, anchorEl } = useMenu();

  const addFilter = () => {
    const newFilter = {
      id: Math.random().toString(16).slice(2),
      columns,
    };
    setFilters([...filters, newFilter]);
  };

  const removeOneFilterOnly = (id: string) => {
    const newFilters = filters.filter((filter) => filter.id !== id);
    setFilters(newFilters);
  };

  const removeFilters = () => {
    setFilters([{ id: '1', columns }]);
  };

  console.log(filters);

  return (
    <div>
      <Button
        sx={{
          fontSize: 16,
          textTransform: 'none',
          color: '#9747FF',
        }}
        id="basic-button"
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleSelectedMenu}
      >
        Filtros
      </Button>
      <Menu
        id="filters-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handeCloseMenu}
      >
        <Grid
          sx={{ padding: 2, my: 2, width: 800 }}
          container
          direction="column"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filters.map((filter, index) => {
              if (index === 0) {
                return (
                  <Filter
                    columns={filter.columns}
                    key={filter.id}
                    onRemove={() => removeOneFilterOnly(filter.id)}
                    marginLeft={filters.length > 1}
                  />
                );
              } else {
                return (
                  <Filter
                    hasComparator
                    columns={filter.columns}
                    key={filter.id}
                    onRemove={() => removeOneFilterOnly(filter.id)}
                  />
                );
              }
            })}
          </Box>

          <Grid container mt={5} columnSpacing={60}>
            <Grid item>
              <Button color="secondary" onClick={addFilter}>
                Adicionar Filtro
              </Button>
            </Grid>

            <Grid item>
              <Button color="warning" onClick={removeFilters}>
                Remover todos
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
};
