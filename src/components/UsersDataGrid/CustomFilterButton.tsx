import { Button } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid-pro';

const CustomFilterButton = () => {
  const apiRef = useGridApiContext();

  const handleClick = () => {
    apiRef.current.showFilterPanel();
  };

  return (
    <Button
      sx={{ textTransform: 'none', fontSize: 15 }}
      color="secondary"
      onClick={handleClick}
    >
      Filtros
    </Button>
  );
};

export default CustomFilterButton;
