import { IColumn } from '@/templates/ListUsers/types';
import {
  SelectChangeEvent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const operations = [
  {
    operator: 'contains',
  },
  {
    operator: 'equal to',
  },
  {
    operator: 'starts with',
  },
  {
    operator: 'ends with',
  },
  {
    operator: 'is empty',
  },
  {
    operator: 'is not empty',
  },
];

interface IProps {
  columns: IColumn[];
  onRemove?: () => void;
  hasComparator?: boolean;
  marginLeft?: boolean;
  setSelectedFilters: any;
  index: number;
}

const Filter: React.FC<IProps> = ({
  columns,
  onRemove,
  hasComparator,
  marginLeft,
  setSelectedFilters,
  index,
}) => {
  const [selectedComparator, setSelectedComparator] = useState('and');
  const [selectedColumn, setSelectedColumn] = useState<IColumn>();
  const [selectedOperator, setSelectedOperator] = useState<{
    operator: string;
  }>({ operator: 'contains' });
  const [searchParam, setSearchParam] = useState();
  const [tempSearchParam, setTempSearchParam] = useState();
  const delay = 500; // tempo de atraso em milissegundos

  const handleComparatorChange = (event: SelectChangeEvent<string>) => {
    const selectedComparator = event.target.value;
    setSelectedComparator(selectedComparator);
  };

  const handleColumnChange = (event: SelectChangeEvent<string>) => {
    const selectedField = event.target.value;
    const column = columns.find((col) => col.field === selectedField);
    setSelectedColumn(column);
  };

  const handleOperatorChange = (event: SelectChangeEvent<string>) => {
    setSelectedOperator({ operator: event.target.value });
  };

  const handleSearchParamChange = (event: React.ChangeEvent<any>) => {
    setTempSearchParam(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParam(tempSearchParam);
    }, delay);

    // Limpa o timeout se tempSearchParam mudar antes do timeout completar
    return () => {
      clearTimeout(handler);
    };
  }, [tempSearchParam]);

  useEffect(() => {
    setSelectedFilters((prev: any) => {
      let temp = [...prev];
      temp[index] = {
        selectedColumn,
        selectedComparator,
        selectedOperator,
        searchParam,
      };

      return temp;
    });
  }, [selectedColumn, selectedComparator, selectedOperator, searchParam]);

  return (
    <Grid container direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Grid container direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item>
          <Button color="warning" onClick={onRemove}>
            X
          </Button>
        </Grid>

        {hasComparator && (
          <Grid item flex={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Comparator</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Comparator"
                value={selectedComparator}
                onChange={handleComparatorChange}
              >
                <MenuItem value="and">e</MenuItem>
                <MenuItem value="or">ou</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {marginLeft && <Grid item flex={1}></Grid>}

        <Grid item flex={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Coluna</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Coluna"
              value={selectedColumn?.field || ''}
              onChange={handleColumnChange}
            >
              {columns.map((column) => (
                <MenuItem value={column.field} key={column.field}>
                  {column.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item flex={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Operação</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Operação"
              value={selectedOperator.operator}
              onChange={handleOperatorChange}
            >
              {operations.map((operation) => (
                <MenuItem key={operation.operator} value={operation.operator}>
                  {operation.operator}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item flex={1}>
          <FormControl fullWidth>
            <TextField
              id="search-param"
              label="Valor"
              value={tempSearchParam}
              onChange={handleSearchParamChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filter;
