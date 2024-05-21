import { Button } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid-pro';

const CustomFilterButton = () => {
  const apiRef = useGridApiContext();

  const handleClick = () => {
    apiRef.current.showFilterPanel();
  };

  return (
    <Button
      sx={{ textTransform: 'none' }}
      color="secondary"
      onClick={handleClick}
    >
      Filters
    </Button>
  );
};

export default CustomFilterButton;
