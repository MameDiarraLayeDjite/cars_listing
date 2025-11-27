import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Stack,
  IconButton,
  CircularProgress,
  alpha,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../api/api.js';

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 41, 59, 0.8)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0px 8px 24px rgba(15, 23, 42, 0.08)'
    : '0px 8px 24px rgba(0, 0, 0, 0.3)',
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: 16,
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(248, 250, 252, 0.5)'
    : 'rgba(15, 23, 42, 0.5)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const initialFormState = {
  year: '',
  make: '',
  model: '',
  series: '',
  mileage: '',
  location_city: '',
  location_branch: '',
  sale_price: '',
  stock_number: '',
  vin: '',
  transmission: '',
  fuel_type: '',
  cylinders: '',
  status: 'actif', // Valeur par défaut
  photos: [],
};

function CreateCar() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newPhotos = [...form.photos];
    const uploadErrors = [];

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        uploadErrors.push(`Le fichier ${file.name} dépasse la taille maximale de 10MB`);
        continue;
      }

      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        let imageUrl = response.data.url;
        if (!imageUrl.startsWith('http')) {
          const baseUrl = window.location.origin.endsWith('/') ?
            window.location.origin.slice(0, -1) : window.location.origin;
          imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        newPhotos.push(imageUrl);
      } catch (error) {
        uploadErrors.push(`Erreur lors du téléversement de ${file.name}`);
      }
    }

    if (uploadErrors.length > 0) {
      setErrors(prev => [...prev, ...uploadErrors]);
    }

    if (newPhotos.length > 0) {
      setForm(prev => ({ ...prev, photos: newPhotos }));
    }

    setUploading(false);
  }

  function removePhotoField(index) {
    setForm((prev) => {
      const newPhotos = prev.photos.filter((_, i) => i !== index);
      return { ...prev, photos: newPhotos };
    });
  }

  function validate() {
    const errs = [];
    const year = parseInt(form.year, 10);
    if (isNaN(year) || year < 1886 || year > new Date().getFullYear() + 1) {
      errs.push('Année invalide');
    }
    if (!form.make.trim()) errs.push('Marque obligatoire');
    if (!form.model.trim()) errs.push('Modèle obligatoire');
    if (!form.series.trim()) errs.push('Série obligatoire');

    const mileage = parseInt(form.mileage, 10);
    if (isNaN(mileage) || mileage < 0) {
      errs.push('Kilométrage invalide');
    }

    if (!form.location_city.trim()) errs.push('Ville obligatoire');
    if (!form.location_branch.trim()) errs.push('Branche obligatoire');

    const salePrice = parseFloat(form.sale_price);
    if (isNaN(salePrice) || salePrice < 0) {
      errs.push('Prix de vente invalide');
    }

    if (!form.stock_number.trim()) errs.push('Numéro de stock obligatoire');
    if (!form.vin.trim()) errs.push('VIN obligatoire');
    if (!form.transmission.trim()) errs.push('Transmission obligatoire');
    if (!form.fuel_type.trim()) errs.push('Type de carburant obligatoire');

    const cylinders = parseInt(form.cylinders, 10);
    if (isNaN(cylinders) || cylinders <= 0) {
      errs.push('Nombre de cylindres invalide');
    }

    if (!Array.isArray(form.photos) || form.photos.length === 0) {
      errs.push('Au moins une photo est requise');
    }

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const carData = {
        year: parseInt(form.year, 10),
        make: form.make.trim(),
        model: form.model.trim(),
        series: form.series.trim(),
        mileage: parseInt(form.mileage, 10),
        location_city: form.location_city.trim(),
        location_branch: form.location_branch.trim(),
        sale_price: parseFloat(form.sale_price),
        stock_number: form.stock_number.trim(),
        vin: form.vin.trim(),
        transmission: form.transmission.trim(),
        fuel_type: form.fuel_type.trim(),
        cylinders: parseInt(form.cylinders, 10),
        status: form.status.trim(),
        photos: form.photos.map((p) => p.trim()),
      };
      await api.post('/cars', carData);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrors(['Erreur lors de la création de la voiture.']);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/admin/dashboard')}
        sx={{
          mb: 3,
          fontWeight: 600,
          borderRadius: 2,
          px: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-4px)',
          },
        }}
      >
        Retour au tableau de bord
      </Button>

      <DashboardCard>
        <CardContent sx={{ p: 5 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                  : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ajouter une nouvelle voiture
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Remplissez tous les champs pour ajouter un véhicule à l'inventaire
            </Typography>
          </Box>

          {/* Error Alerts */}
          {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Informations de base */}
            <FormSection>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Informations de base
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Année"
                    name="year"
                    type="number"
                    value={form.year}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 1886, max: new Date().getFullYear() + 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Marque"
                    name="make"
                    value={form.make}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Modèle"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Série"
                    name="series"
                    value={form.series}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Spécifications techniques */}
            <FormSection>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Spécifications techniques
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kilométrage"
                    name="mileage"
                    type="number"
                    value={form.mileage}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 0 }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">km</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Transmission"
                    name="transmission"
                    value={form.transmission}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Type de carburant"
                    name="fuel_type"
                    value={form.fuel_type}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Essence, Diesel"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cylindres"
                    name="cylinders"
                    type="number"
                    value={form.cylinders}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Statut"
                    name="status"
                    value={form.status || 'actif'}
                    onChange={handleChange}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </TextField>
                </Grid>
              </Grid>
            </FormSection>

            {/* Localisation et prix */}
            <FormSection>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Localisation et prix
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ville"
                    name="location_city"
                    value={form.location_city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Branche"
                    name="location_branch"
                    value={form.location_branch}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prix de vente"
                    name="sale_price"
                    type="number"
                    value={form.sale_price}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 0, step: 0.01 }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Numéro de stock"
                    name="stock_number"
                    value={form.stock_number}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="VIN"
                    name="vin"
                    value={form.vin}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Photos */}
            <FormSection>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Photos
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={uploading ? <CircularProgress size={20} /> : <AddPhotoAlternateIcon />}
                disabled={uploading}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                {uploading ? 'Téléversement en cours...' : 'Ajouter des photos'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handlePhotoUpload}
                />
              </Button>

              {form.photos.length > 0 && (
                <Grid container spacing={2}>
                  {form.photos.map((url, index) => {
                    const imageUrl = url.startsWith('http') ? url :
                      url.startsWith('/') ? `${window.location.origin}${url}` :
                        `${window.location.origin}/${url}`;

                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            borderRadius: 3,
                            overflow: 'hidden',
                            height: 200,
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            '&:hover .delete-btn': {
                              opacity: 1,
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={imageUrl}
                            alt={`Voiture ${index + 1}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <IconButton
                            className="delete-btn"
                            onClick={() => removePhotoField(index)}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'error.main',
                              color: 'white',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              '&:hover': {
                                backgroundColor: 'error.dark',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              {form.photos.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Aucune photo sélectionnée. Veuillez téléverser au moins une photo.
                </Typography>
              )}
            </FormSection>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  textTransform: 'none',
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                    : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0px 8px 20px rgba(255, 107, 53, 0.3)'
                    : '0px 8px 20px rgba(255, 140, 97, 0.4)',
                  '&:hover': {
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #E85A2A 0%, #E88A00 100%)'
                      : 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                  },
                }}
              >
                {submitting ? 'Création en cours...' : 'Créer la voiture'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/admin/dashboard')}
                disabled={submitting}
                sx={{
                  flex: { xs: 1, sm: 'auto' },
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Annuler
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </DashboardCard>
    </Container>
  );
}

export default CreateCar;