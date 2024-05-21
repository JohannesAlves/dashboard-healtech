'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { IUsers } from '@/providers/dto/get-all-users-dto';
import { getAllUsers } from '@/providers/useCases/get-all-users';

import Navbar from '@/components/Navbar';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Menu,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import ExpandeMoreIcon from '@/assets/expand_more.svg';
import ExpandeLessIcon from '@/assets/expand_less.svg';

import UsersTable from '@/components/UsersTable';

const ListUsersTemplate = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderBy, setOrderBy] = useState('id');

  const isOpen = !!anchorEl;

  const handleSearch = () => {};
  const handleGroupByFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuGroupBy = () => {
    setAnchorEl(null);
  };

  const handleOrderByChange = (event: any) => {
    setOrderBy(event.target.value);
    handleCloseMenuGroupBy();
  };

  const handleSort = (sortByValue: string, users: IUsers[]) => {
    const sortedUsers = users.sort((a, b) => {
      switch (sortByValue) {
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
    });

    return sortedUsers;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        const sortedUsers = handleSort(orderBy, users);
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [orderBy]);

  return (
    <Grid sx={{ backgroundColor: 'white', height: '100%' }}>
      <Navbar />

      <Box sx={{ color: '#515151', padding: 5 }}>
        <Typography variant="h5" component="h5">
          Usuários
        </Typography>

        <Box sx={{ maxWidth: 600, mt: 5, display: 'flex', gap: 2 }}>
          <TextField
            sx={{ width: 350 }}
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            placeholder="Pesquisar ID ou nome ou telefone..."
            size="small"
            variant="outlined"
            onChange={handleSearch}
          />

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
              onClick={handleGroupByFilter}
            >
              Ordenar por{' '}
              <Image
                src={ExpandeMoreIcon}
                width={20}
                height={20}
                alt="Expande more icon"
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleCloseMenuGroupBy}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <RadioGroup
                sx={{ paddingLeft: 2, paddingRight: 10 }}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={orderBy}
                onChange={handleOrderByChange}
              >
                <FormControlLabel
                  value="id"
                  control={<Radio color="secondary" />}
                  label="ID"
                />
                <FormControlLabel
                  value="nome"
                  control={<Radio color="secondary" />}
                  label="Nome"
                />
                <FormControlLabel
                  value="telefone"
                  control={<Radio color="secondary" />}
                  label="Telefone"
                />

                <FormControlLabel
                  value="data_de_cadastro"
                  control={<Radio color="secondary" />}
                  label="Data de cadastro"
                />

                <FormControlLabel
                  value="status"
                  control={<Radio color="secondary" />}
                  label="Status"
                />
              </RadioGroup>
            </Menu>
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 3,
        }}
      >
        <UsersTable users={users} />
      </Box>
    </Grid>
  );
};

export default ListUsersTemplate;
