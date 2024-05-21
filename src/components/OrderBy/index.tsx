import { useMenu } from '@/hooks/use-menu';
import {
  Button,
  Menu,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React, { SetStateAction } from 'react';

interface IProps {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}

const radios = [
  {
    value: 'id',
    label: 'ID',
  },
  {
    value: 'nome',
    label: 'Nome',
  },
  {
    value: 'telefone',
    label: 'Telefone',
  },
  {
    value: 'data_de_cadastro',
    label: 'Data de cadastro',
  },
  {
    value: 'status',
    label: 'Status',
  },
];

export const OrderBy: React.FC<IProps> = ({ value, setValue }) => {
  const { handeCloseMenu, handleSelectedMenu, isOpen, anchorEl } = useMenu();

  const handleOrderByChange = (event: any) => {
    setValue(event.target.value);
    handeCloseMenu();
  };

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
        Ordenar por{' '}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handeCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <RadioGroup
          sx={{ paddingLeft: 2, paddingRight: 10 }}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={value}
          onChange={handleOrderByChange}
        >
          {radios.map((radio) => (
            <FormControlLabel
              key={radio.value}
              value={radio.value}
              control={<Radio color="secondary" />}
              label={radio.label}
            />
          ))}
        </RadioGroup>
      </Menu>
    </div>
  );
};
