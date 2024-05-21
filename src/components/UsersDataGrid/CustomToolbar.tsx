import { Portal } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import CustomFilterButton from './CustomFilterButton';

export const CustomToolbar = () => {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')!}>
        <GridToolbarContainer>
          <CustomFilterButton />
        </GridToolbarContainer>
      </Portal>
    </React.Fragment>
  );
};

export default CustomToolbar;
