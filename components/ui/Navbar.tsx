import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '@/context/ui';
import NextLink from 'next/link';

export const Navbar = () => {

  const {openSideMenu} = useContext(UIContext)


  return (
    <AppBar position="sticky">
       <Toolbar>
        <IconButton 
        size="large"
        edge="start"
        onClick={openSideMenu}
        >
            <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" style={{textDecoration:"none", color:"#fff", cursor:"pointer"}} >
          
        <Typography variant="h6">
            OpenJira
        </Typography>
        </NextLink>
       </Toolbar>
    </AppBar>
  )
}
