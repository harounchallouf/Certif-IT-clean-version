import React from 'react'
import { Image } from "react-bootstrap";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
function MenuRender(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
 
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
    <>

          <Image
            style={{ width: "38px", height: "38px" }}
            className="img-fit ml-1"
            roundedCircle
            src={props.imageUrl}
            onClick={handleMenu}
          />

        <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            </>
    )
}

export default MenuRender
