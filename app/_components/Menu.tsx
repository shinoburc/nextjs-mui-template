import * as React from 'react';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainMenu = (
  <React.Fragment>
    <Link href='/' passHref>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='ThanksCard' />
      </ListItemButton>
    </Link>
    <Link href='/user' passHref>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='User' />
      </ListItemButton>
    </Link>
    <Link href='/header-items-form' passHref>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Header Items Form' />
      </ListItemButton>
    </Link>
    <Link href='/header-items-list' passHref>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Header Items List' />
      </ListItemButton>
    </Link>
    <Link href='/file-uploader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary='file-uploader' />
      </ListItemButton>
    </Link>
    <Link href='/qr-code-reader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary='qr-code-reader' />
      </ListItemButton>
    </Link>
    <Link href='/zxing-barcode-reader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary='zxing-barcode-reader' />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryMenu = (
  <React.Fragment>
    <ListSubheader component='div' inset>
      Secondary Menu
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Secondary Menu 1' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Secondary Menu 2' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Secondary Menu 3' />
    </ListItemButton>
  </React.Fragment>
);
