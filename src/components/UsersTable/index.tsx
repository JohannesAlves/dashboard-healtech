import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@/assets/menu-icon.svg';
import { IUsers } from '@/providers/dto/get-all-users-dto';
import { StyledTableCell } from './styles';
import React from 'react';

interface IProps {
  users: IUsers[];
}

const UsersTable: React.FC<IProps> = ({ users }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell>Telefone</StyledTableCell>
            <StyledTableCell>Data de cadastro</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                height: '5rem',
                backgroundColor:
                  user.status === 'Ativo' ? 'transparent' : '#F6F6F6',
              }}
            >
              <TableCell component="th" scope="user">
                {user.id}
              </TableCell>
              <TableCell component="th" scope="user">
                {user.nome}
              </TableCell>
              <TableCell>{user.telefone}</TableCell>
              <TableCell sx={{ color: '#6A6A6A' }}>
                {user.data_de_cadastro}
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    mx: 'auto',
                    width: 80,
                    borderRadius: 5,
                    textAlign: 'center',
                    color: user.status === 'Ativo' ? '#46855B' : '#E53E3E',
                    backgroundColor:
                      user.status === 'Ativo' ? '#0AB24326' : '#E53E3E1A',
                  }}
                >
                  {user.status}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: 60 }}>
                <button>
                  <Image
                    src={MenuIcon}
                    width={25}
                    height={25}
                    alt="Menu Icon"
                  />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
