import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Drawer, IconButton, List, ListItem, styled } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MenuIcon from '@mui/icons-material/Menu';

import AmplifyService from "./services/amplifyService";

export default function DrawerMenu() {
    // sets the position the menu will come from;
    const drawerPosition = 'left';
    const [openDrawer, setOpenDrawer] = useState({
        [drawerPosition]: false
    });
    const [expandAccordion, setExpandAccordion] = useState(false);
    const navigate = useNavigate();
    const greenDark = '#256A25';


    //Accordion and AccordionSummary defines custom styles to said MUI components;
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.4rem', color: `${greenDark}` }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: '#ffffff',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: '5px',
            fontSize: '1.6rem',
        },
    }));

    const handleDrawer = (anchor, open, link) => {
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        if (link) { navigate(link); }
    }

    //This is the layout for the menu;
    const list = (anchor) => (
        <Box role="presentation">
            <List>
                <ListItem button
                    onClick={() => { handleDrawer(anchor, false, '/admin/dashboard') }}
                    sx={{ marginLeft: '1.8rem', marginBottom: '1rem', marginTop: '1.5rem' }}
                >
                    <p className='drawer-item'>Inicio</p>
                </ListItem>

                <Accordion expanded={expandAccordion} onChange={() => setExpandAccordion(!expandAccordion)} sx={{ marginBottom: '1rem' }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <p className='drawer-item'>
                            Pedidos
                        </p>
                    </AccordionSummary>

                    <ListItem button
                        sx={{ marginLeft: '2.8rem', marginBottom: '0.5rem' }}
                        onClick={() => { handleDrawer(anchor, false, '/admin/orders/ongoing') }}
                    >
                        <p className='drawer-item'>
                            Pedidos en curso
                        </p>
                    </ListItem>

                    <ListItem button
                        sx={{ marginLeft: '2.8rem', marginBottom: '0.5rem' }}
                        onClick={() => { handleDrawer(anchor, false, '/admin/orders/history') }}
                    >
                        <p className='drawer-item' >
                            Historial de pedidos
                        </p>
                    </ListItem>
                </Accordion>

                <ListItem button
                    sx={{ marginLeft: '1.8rem', marginBottom: '1rem' }}
                    onClick={() => { handleDrawer(anchor, false, '/admin/employees') }}
                >
                    <p className='drawer-item'>Personal</p>
                </ListItem>

                <ListItem button
                    onClick={() => { handleDrawer(anchor, false, '/login'); AmplifyService.signOut() }}
                    sx={{ marginLeft: '1.8rem', marginBottom: '1rem' }}
                >
                    <p className='drawer-item'>Cerrar sesión</p>
                </ListItem>
            </List >
        </Box >
    );

    return (
        <>
            <IconButton onClick={() => handleDrawer('left', true)} sx={{ width: 'fit-content' }} >
                <MenuIcon sx={{ color: '#ffffff', fontSize: '3rem', cursor: 'pointer' }} />
            </IconButton>
            <Drawer
                anchor={drawerPosition}
                open={openDrawer[drawerPosition]}
                onClose={() => handleDrawer(drawerPosition, false)}
            >
                {list(drawerPosition)}
            </Drawer>
        </>
    );
}