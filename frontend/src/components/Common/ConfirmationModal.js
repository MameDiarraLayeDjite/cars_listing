import React from 'react';
import {
    Dialog,
    DialogActions,
    Typography,
    Button,
    Box,
    IconButton,
    alpha,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const ConfirmationModal = ({ open, onClose, onConfirm, title, message, confirmText = "Confirmer", cancelText = "Annuler" }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    backdropFilter: 'blur(20px)',
                    backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(30, 41, 59, 0.9)',
                    boxShadow: theme.palette.mode === 'light'
                        ? '0px 20px 60px rgba(15, 23, 42, 0.15)'
                        : '0px 20px 60px rgba(0, 0, 0, 0.5)',
                    border: `1px solid ${theme.palette.divider}`,
                    maxWidth: 400,
                    width: '100%',
                    p: 1
                }
            }}
        >
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ textAlign: 'center', pt: 3, px: 2 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: theme.palette.error.main
                    }}
                >
                    <WarningAmberRoundedIcon sx={{ fontSize: 32 }} />
                </Box>

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                    {title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {message}
                </Typography>
            </Box>

            <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 2.5,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'text.primary',
                        borderColor: theme.palette.divider
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                    sx={{
                        borderRadius: 2.5,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
