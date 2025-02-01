
import {Menu, MenuItem} from '@mui/material';






const HeaderMenu = ({open, handleClose }) => {

    const openMenu = Boolean(open);

    
  

  return (
    <Menu
      id="basic-menu"
      anchorEl={open}
      open={openMenu}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>Top Rated</MenuItem>
      <MenuItem onClick={handleClose}>Popular</MenuItem>
      <MenuItem onClick={handleClose}>Now Playing</MenuItem>
    </Menu>
  );
};

export default HeaderMenu;
