/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { IUsers } from '@/providers/dto/get-all-users-dto';
import { getAllUsers } from '@/providers/useCases/get-all-users';

import Navbar from '@/components/Navbar';
import { Box, Grid, Typography } from '@mui/material';

import ExpandeMoreIcon from '@/assets/expand_more.svg';
import ExpandeLessIcon from '@/assets/expand_less.svg';

import UsersTable from '@/components/UsersTable';
import { SearchBar } from '@/components/SearchBar';
import { useSearch } from '@/hooks/use-search';
import { OrderBy } from '@/components/OrderBy';
import { Filters } from '@/components/Filters';
import { IColumn } from './types';

const columns: IColumn[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'textField',
  },
  {
    field: 'nome',
    headerName: 'Nome',
    type: 'textField',
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    type: 'textField',
  },
  {
    field: 'data_de_cadastro',
    headerName: 'Data de cadastro',
    type: 'date',
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'select',
    align: 'center',
  },
  {
    field: 'actions',
    headerName: '',
    type: '',
  },
];

export interface ISelectedFilters {
  index: number;
  selectedColumn: {
    field: keyof IUsers;
    headerName: string;
    type: string;
  };
  selectedComparator: string;
  selectedOperator: {
    operator: string;
  };
  searchParam: string;
}

const ListUsersTemplate = () => {
  const { filteredData, setData, setTerm, term, inputRef } = useSearch<IUsers>(
    (user, term) => {
      if (!term) return true;

      return (
        user.id.toLowerCase().startsWith(term.toLowerCase()) ||
        user.telefone?.toLowerCase().startsWith(term.toLowerCase()) ||
        user.nome.toLowerCase().startsWith(term.toLowerCase())
      );
    }
  );
  const [users, setUsers] = useState<IUsers[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderBy, setOrderBy] = useState('id');
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters[]>(
    []
  );

  const sortFunc = (a: IUsers, b: IUsers) => {
    switch (orderBy) {
      case 'id':
        return Number(a.id) - Number(b.id);
      case 'nome':
        return a.nome.localeCompare(b.nome);
      case 'status': // Ordenar por status (Ativo vem antes de Inativo)
        if (a.status === 'Ativo' && b.status === 'Inativo') {
          return -1;
        } else if (a.status === 'Inativo' && b.status === 'Ativo') {
          return 1;
        } else {
          return 0; // Mantém a ordem atual se ambos forem 'Ativo' ou 'Inativo'
        }
      default:
        return Number(a.id) - Number(b.id);
    }
  };

  // Função auxiliar para aplicar um único filtro ao conjunto de dados.
  const applyFilter = (data: IUsers[], selectedFilter: ISelectedFilters) => {
    const {
      selectedColumn,
      selectedOperator,
      searchParam: initialSearchParam,
    } = selectedFilter;
    let searchParam = initialSearchParam;

    if (
      selectedOperator.operator === 'is empty' ||
      selectedOperator.operator === 'is not empty'
    ) {
      searchParam = 'value';
    }

    if (!selectedColumn || !searchParam || !selectedOperator) {
      return data;
    }

    return data.filter((item) => {
      const fieldValue = item[selectedColumn.field];
      switch (selectedOperator.operator) {
        case 'equal to':
          return fieldValue === searchParam;
        case 'contains':
          return fieldValue?.includes(searchParam);
        case 'starts with':
          return fieldValue?.startsWith(searchParam);
        case 'ends with':
          return fieldValue?.endsWith(searchParam);
        case 'is empty':
          return fieldValue?.length === 0;
        case 'is not empty':
          return fieldValue?.length !== 0;
        default:
          return true;
      }
    });
  };

  const filterFunc = () => {
    // Inicializamos o array para manter os dados filtrados.
    let dataFiltered = users;

    // Iteramos sobre todos os filtros selecionados.
    selectedFilters.forEach((selectedFilter, index) => {
      if (index === 0) {
        // Para o primeiro filtro, aplicamos diretamente.
        dataFiltered = applyFilter(dataFiltered, selectedFilter);
      } else {
        // Para filtros subsequentes, verificamos o selectedComparator.
        if (selectedFilter.selectedComparator === 'and') {
          // Se o operador for 'and', aplicamos o filtro ao conjunto de dados atual.
          dataFiltered = applyFilter(dataFiltered, selectedFilter);
        } else if (selectedFilter.selectedComparator === 'or') {
          const orFilteredData = applyFilter(users, selectedFilter);
          dataFiltered = [...[...dataFiltered, ...orFilteredData]];
        }
      }
    });

    // Atualizamos os dados filtrados.
    setData(dataFiltered);
  };

  useEffect(() => {
    filterFunc();
  }, [selectedFilters]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        users.sort(sortFunc);
        setData(users);
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [orderBy]);

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
        <UsersTable columns={columns} users={filteredData || []} />
      </Box>
    </Grid>
  );
};

export default ListUsersTemplate;
