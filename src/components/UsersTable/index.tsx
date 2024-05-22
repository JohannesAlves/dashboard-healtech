import {
  Button,
  Divider,
  Menu,
  MenuItem,
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
import React, { useState } from 'react';
import { IColumn } from '@/templates/ListUsers/types';
import { useMenu } from '@/hooks/use-menu';
import ActivateIcon from '@/assets/activate-icon.svg';
import BlockIcon from '@/assets/block-icon.svg';

interface IProps {
  users: IUsers[];
  columns: IColumn[];
  handleUser: (user: IUsers, status: 'Ativo' | 'Inativo') => void;
}

const UsersTable: React.FC<IProps> = ({ users, columns = [], handleUser }) => {
  const [selectedUser, setSelectedUser] = useState<IUsers>({} as IUsers);
  const { anchorEl, handeCloseMenu, handleSelectedMenu, isOpen } = useMenu();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.field}
                align={column.align || undefined}
              >
                {column.headerName}
              </StyledTableCell>
            ))}
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
                <Button
                  id="basic-button"
                  aria-controls={isOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
                  onClick={(event) => {
                    handleSelectedMenu(event);
                    setSelectedUser(user);
                  }}
                >
                  <Image
                    src={MenuIcon}
                    width={25}
                    height={25}
                    alt="Menu Icon"
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handeCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography
          sx={{
            color: '#515151',
            pl: 3,
            pr: 10,
          }}
        >
          Mudar status
        </Typography>
        <Divider orientation="horizontal" />

        <MenuItem
          sx={{ color: '#2E7D32' }}
          onClick={() => {
            handeCloseMenu();
            handleUser(selectedUser, 'Ativo');
          }}
        >
          <Image
            style={{ marginRight: 10 }}
            src={ActivateIcon}
            width={20}
            height={20}
            alt="a green icon to activate"
          />
          Ativar
        </MenuItem>
        <MenuItem
          sx={{
            color: '#E53E3E',
          }}
          onClick={() => {
            handeCloseMenu();
            handleUser(selectedUser, 'Inativo');
          }}
        >
          <Image
            style={{ marginRight: 10 }}
            src={BlockIcon}
            width={20}
            height={20}
            alt="a red icon to inactivate"
          />
          Inativar
        </MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default UsersTable;
