import { useState } from 'react';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;

  const handleSelectedMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handeCloseMenu = () => {
    setAnchorEl(null);
  };

  return { handeCloseMenu, handleSelectedMenu, isOpen, anchorEl };
};
