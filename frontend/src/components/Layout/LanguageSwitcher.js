import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
        localStorage.setItem('i18nextLng', languageCode);
        handleClose();
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <>
            <Tooltip title="Change Language">
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                    size="medium"
                    sx={{
                        ml: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        },
                    }}
                >
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        minWidth: 180,
                        borderRadius: 2,
                    },
                }}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={i18n.language === language.code}
                        sx={{
                            py: 1.5,
                            px: 2,
                        }}
                    >
                        <ListItemIcon sx={{ fontSize: '1.5rem', minWidth: 40 }}>
                            {language.flag}
                        </ListItemIcon>
                        <ListItemText>{language.name}</ListItemText>
                        {i18n.language === language.code && (
                            <CheckIcon color="primary" fontSize="small" sx={{ ml: 1 }} />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;
