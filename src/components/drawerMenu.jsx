import { useState } from "react";

import { Box, Drawer, IconButton, List, ListItem, styled } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerMenu() {
    const drawerPosition = 'left';
    const greenDark = '#256A25';

    const [openDrawer, setOpenDrawer] = useState({
        [drawerPosition]: false
    });
    const [expandAccordion, setExpandAccordion] = useState(false);


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

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    };

    const list = (anchor) => (
        <Box role="presentation">

            <List>
                <ListItem button
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
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
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                    >
                        <p className='drawer-item'>
                            Pedidos en curso
                        </p>
                    </ListItem>

                    <ListItem button
                        sx={{ marginLeft: '2.8rem', marginBottom: '0.5rem' }}
                        onClick={toggleDrawer(anchor, false)}
                        onKeyDown={toggleDrawer(anchor, false)}
                    >
                        <p className='drawer-item' >
                            Historial de pedidos
                        </p>
                    </ListItem>
                </Accordion>

                <ListItem button
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                    sx={{ marginLeft: '1.8rem', marginBottom: '1rem' }}
                >
                    <p className='drawer-item'>Personal</p>
                </ListItem>

                <ListItem button
                    onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}
                    sx={{ marginLeft: '1.8rem', marginBottom: '1rem' }}
                >
                    <p className='drawer-item'>Cerrar sesión</p>
                </ListItem>
            </List >
        </Box >
    );

    return (
        <>
            <IconButton onClick={toggleDrawer('left', true)} sx={{ width: 'fit-content' }} >
                <MenuIcon sx={{ color: '#ffffff', fontSize: '3rem', cursor: 'pointer' }} />
            </IconButton>
            <Drawer
                anchor={drawerPosition}
                open={openDrawer[drawerPosition]}
                onClose={toggleDrawer(drawerPosition, false)}
            >
                {list(drawerPosition)}
            </Drawer>
        </>
    );
}