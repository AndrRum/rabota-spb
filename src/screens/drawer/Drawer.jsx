import * as React from 'react';
import {memo} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CampaignIcon from '@mui/icons-material/Campaign';
import PaymentsIcon from '@mui/icons-material/Payments';
import "./Drawer.css";
import HandshakeIcon from '@mui/icons-material/Handshake';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export const DrawerComponent = memo((props) => {
    const theme = useTheme();
    const {open, handleDrawerClose, onClick} = props

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {
                            theme.direction === 'rtl'
                                ? <ChevronLeftIcon className={"buttonColor"}/>
                                : <ChevronRightIcon className={"buttonColor"}/>
                        }
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Рекламодателям', 'Оплата'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => onClick(index)}>
                                <ListItemIcon>
                                    {index % 2 === 0
                                        ? <CampaignIcon className={"buttonColor"}/>
                                        : <PaymentsIcon className={"buttonColor"}/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <button
                    onClick={() => onClick(-1)}
                    className={"conditions"}
                >
                    <HandshakeIcon className={"buttonColor"} fontSize={"small"}/>
                    <p className={"title_conditions"}>Пользовательское соглашение</p>
                </button>
            </Drawer>
        </Box>
    );
})
