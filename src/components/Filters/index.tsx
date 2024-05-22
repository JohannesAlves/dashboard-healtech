import { useMenu } from '@/hooks/use-menu';
import { IUsers } from '@/providers/dto/get-all-users-dto';
import { IColumn } from '@/templates/ListUsers/types';
import { Button, Menu, Grid, Box, Badge } from '@mui/material';
import React, { SetStateAction, useState } from 'react';
import Filter from '../Filter';
import { ISelectedFilters } from '@/templates/ListUsers';

import ExpandeMoreIcon from '@/assets/expand_more.svg';
import ExpandeLessIcon from '@/assets/expand_less.svg';
import AddIcon from '@/assets/add.svg';
import RemoveIcon from '@/assets/delete_forever.svg';

import Image from 'next/image';

interface IProps {
  rows?: IUsers[];
  columns: IColumn[];
  selectedFilters: ISelectedFilters[];
  setSelectedFilters: React.Dispatch<SetStateAction<ISelectedFilters[]>>;
}

export const Filters: React.FC<IProps> = ({
  columns,
  selectedFilters,
  setSelectedFilters,
}) => {
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

  const removeOneFilterOnly = (id: string, index?: number) => {
    const newFilters = filters.filter((filter) => filter.id !== id);
    const removedFilter = selectedFilters.filter(
      (filter) => filter.index !== index
    );
    setSelectedFilters(removedFilter);
    setFilters(newFilters);
  };

  const removeFilters = () => {
    setSelectedFilters([]);
    setFilters([{ id: '1', columns }]);
    handeCloseMenu();
  };

  return (
    <div>
      <Badge
        badgeContent={selectedFilters.length}
        color="secondary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
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
          {isOpen ? (
            <Image
              src={ExpandeMoreIcon}
              width={25}
              height={25}
              alt="expand more"
            />
          ) : (
            <Image
              src={ExpandeLessIcon}
              width={25}
              height={25}
              alt="expand less"
            />
          )}
        </Button>
      </Badge>
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
                    index={index}
                    columns={filter.columns}
                    key={`first-${filter.id}`}
                    onRemove={() => removeOneFilterOnly(filter.id)}
                    marginLeft={filters.length > 1}
                    setSelectedFilters={setSelectedFilters}
                  />
                );
              } else {
                return (
                  <Filter
                    index={index}
                    hasComparator
                    columns={filter.columns}
                    key={`filter-${filter.id}`}
                    onRemove={() => removeOneFilterOnly(filter.id, index)}
                    setSelectedFilters={setSelectedFilters}
                  />
                );
              }
            })}
          </Box>

          <Box mt={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                color="secondary"
                sx={{ fontSize: 15, textTransform: 'none' }}
                onClick={addFilter}
              >
                <Image src={AddIcon} width={20} height={20} alt="add icon" />{' '}
                Adicionar Filtro
              </Button>
            </Box>

            <Box>
              <Button
                sx={{ fontSize: 15, color: '#FF4747', textTransform: 'none' }}
                onClick={removeFilters}
              >
                <Image
                  src={RemoveIcon}
                  width={20}
                  height={20}
                  alt="remove icon"
                />{' '}
                Remover todos
              </Button>
            </Box>
          </Box>
        </Grid>
      </Menu>
    </div>
  );
};
