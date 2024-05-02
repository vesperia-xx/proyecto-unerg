import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContextMenu = ({ onDelete, onEdit, canDownload, studentStatus }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        onDelete();
        handleClose();
    };

    const handleEditClick = () => {
        onEdit();
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-controls="context-menu"
                aria-haspopup="true"
                aria-label="Abrir menú"
                onClick={handleClick}
                style={{ color: 'inherit' }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="context-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleEditClick} disabled={studentStatus === 'Completado' || canDownload}>
                    <EditIcon sx={{ color: '#4079ED', marginRight: 1 }} />
                    Editar
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} disabled={studentStatus === 'Completado' || canDownload}>
                    <DeleteIcon sx={{ color: '#EB5757', marginRight: 1 }} />
                    Borrar
                </MenuItem>

            </Menu>
        </div>
    );
};

export default ContextMenu;