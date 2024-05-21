'use client';

import { useEffect, useState } from 'react';

import { IUsers } from '@/providers/dto/get-all-users-dto';
import { getAllUsers } from '@/providers/useCases/get-all-users';

import Navbar from '@/components/Navbar';
import { Box, Grid, Typography } from '@mui/material';

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import UsersDataGrid from '@/components/UsersDataGrid';

const columns: GridColDef[] = [
  { field: 'id', flex: 1, headerName: 'ID' },
  { field: 'nome', flex: 1, headerName: 'Nome' },
  { field: 'telefone', flex: 1, headerName: 'Telefone' },
  { field: 'data_de_cadastro', flex: 1, headerName: 'Data de cadastro' },
  {
    field: 'status',
    flex: 1,
    headerName: 'Status',
    headerAlign: 'center',

    renderCell: (params: GridRenderCellParams<IUsers>) => (
      <Typography
        sx={{
          mx: 'auto',
          width: 80,
          borderRadius: 5,
          textAlign: 'center',
          color: params.value === 'Ativo' ? '#46855B' : '#E53E3E',
          backgroundColor: params.value === 'Ativo' ? '#0AB24326' : '#E53E3E1A',
        }}
      >
        {params.value}
      </Typography>
    ),
  },
];

const ListUsersTemplate = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [orderBy, setOrderBy] = useState('id');

  const sortUsers = (a: IUsers, b: IUsers) => {
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ color: '#515151', padding: 5 }}>
        <Typography variant="h5" component="h5">
          Usuários
        </Typography>
      </Box>

      <Box
        sx={{
          padding: 3,
        }}
      >
        <UsersDataGrid columns={columns} rows={users} />
      </Box>
    </Grid>
  );
};

export default ListUsersTemplate;
