import React, { useState, useContext } from "react";

import statusStaffContext from "../Task";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectStatus() {
    const { statusStaff, setStatusStaff } = useContext(statusStaffContext)
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setStatusStaff(event.target.value);
    }; 

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select--status--label">Status</InputLabel>
                <Select
                    /* labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select" */
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={statusStaff}
                    label="Status"
                    onChange={handleChange}>
                    <MenuItem value="">
                        <em>Pausado</em>
                    </MenuItem>
                    <MenuItem value={true}>Pausado</MenuItem>
                    <MenuItem value={false}>Recibir nuevos</MenuItem>
                    <MenuItem value={null}>Cerrar sesión</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}