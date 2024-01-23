import * as React from 'react';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CameraIcon from '@mui/icons-material/Camera';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LineAxisIcon from '@mui/icons-material/LineAxis';

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
    <Link href='/revalidate-data' passHref>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Revalidate Data' />
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
    <Link href='/camera-photo-uploader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <CameraIcon />
        </ListItemIcon>
        <ListItemText primary='camera-photo-uploader' />
      </ListItemButton>
    </Link>
    <Link href='/qr-code-reader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <QrCodeScannerIcon />
        </ListItemIcon>
        <ListItemText primary='qr-code-reader' />
      </ListItemButton>
    </Link>
    <Link href='/zxing-barcode-reader' passHref>
      <ListItemButton>
        <ListItemIcon>
          <QrCode2Icon />
        </ListItemIcon>
        <ListItemText primary='zxing-barcode-reader' />
      </ListItemButton>
    </Link>
    <Link href='/activereports' passHref>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary='ActiveReports' />
      </ListItemButton>
    </Link>
    <Link href='/leader-line' passHref>
      <ListItemButton>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary='LeaderLine' />
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
