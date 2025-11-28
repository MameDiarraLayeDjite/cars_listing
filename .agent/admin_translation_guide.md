# Guide de traduction des composants Admin

Les clés de traduction sont maintenant ajoutées dans `fr/translation.json` et `en/translation.json`.

## 📋 Composants Admin à traduire :

### 1. **AdminLogin.js**
### 2. **AdminDashboard.js** 
### 3. **AdminCarDetails.js**
### 4. **CreateCar.js**
### 5. **EditCar.js**

---

## 🔑 Clés de traduction disponibles :

### **admin.login** (AdminLogin.js)
- `title` - "Connexion Administrateur" / "Administrator Login"
- `subtitle` - "Accédez au tableau de bord" / "Access the dashboard"  
- `email` - "Email" / "Email"
- `password` - "Mot de passe" / "Password"
- `loginButton` - "Se connecter" / "Login"
- `loggingIn` - "Connexion..." / "Logging in..."
- `error` - "Email ou mot de passe incorrect" / "Invalid email or password"

### **admin.dashboard** (AdminDashboard.js)
- `title` - "Tableau de bord" / "Dashboard"
- `welcome` - "Bienvenue, Admin" / "Welcome, Admin"
- `totalCars` - "Total véhicules" / "Total Vehicles"
- `addNewCar` - "Ajouter un véhicule" / "Add Vehicle"
- `searchPlaceholder` - "Rechercher par marque, modèle..." / "Search by brand, model..."
- `noCars` - "Aucun véhicule disponible" / "No vehicles available"
- `loadingCars` - "Chargement des véhicules..." / "Loading vehicles..."
- `actions` - "Actions" / "Actions"
- `view` - "Voir" / "View"
- `edit` - "Modifier" / "Edit"
- `delete` - "Supprimer" / "Delete"
- `confirmDelete` - "Êtesvous sûr de vouloir supprimer ce véhicule ?" / "Are you sure you want to delete this vehicle?"
- `deleteSuccess` - "Véhicule supprimé avec succès" / "Vehicle deleted successfully"
- `deleteError` - "Erreur lors de la suppression" / "Error deleting vehicle"

### **admin.createCar** (CreateCar.js)
- `title` - "Ajouter un nouveau véhicule" / "Add New Vehicle"
- `basicInfo` - "Informations de base" / "Basic Information"
- `specifications` - "Spécifications" / "Specifications"
- `pricing` - "Prix" / "Pricing"
- `photos` - "Photos" / "Photos"
- `make` - "Marque" / "Make"
- `model` - "Modèle" / "Model"
- `year` - "Année" / "Year"
- `price` - "Prix" / "Price"
- `salePrice` - "Prix de vente" / "Sale Price"
- `mileage` - "Kilométrage" / "Mileage"
- `fuelType` - "Type de carburant" / "Fuel Type"
- `transmission` - "Transmission" / "Transmission"
- `condition` - "État" / "Condition"
- `color` - "Couleur" / "Color"
- `interior` - "Intérieur" / "Interior"
- `cylinders` - "Cylindres" / "Cylinders"
- `vin` - "VIN" / "VIN"
- `stockNumber` - "Numéro de stock" / "Stock Number"
- `location` - "Localisation" / "Location"
- `uploadPhotos` - "Télécharger des photos" / "Upload Photos"
- `dragDrop` - "Glissez-déposez ou cliquez pour sélectionner" / "Drag & drop or click to select"
- `save` - "Enregistrer" / "Save"
- `saving` - "Enregistrement..." / "Saving..."
- `cancel` - "Annuler" / "Cancel"
- `createSuccess` - "Véhicule créé avec succès" / "Vehicle created successfully"
- `createError` - "Erreur lors de la création" / "Error creating vehicle"
- `required` - "Ce champ est requis" / "This field is required"

### **admin.editCar** (EditCar.js)
- `title` - "Modifier le véhicule" / "Edit Vehicle"
- `updateSuccess` - "Véhicule mis à jour avec succès" / "Vehicle updated successfully"
- `updateError` - "Erreur lors de la mise à jour" / "Error updating vehicle"
- `update` - "Mettre à jour" / "Update"
- `updating` - "Mise à jour..." / "Updating..."

### **admin.carDetails** (AdminCarDetails.js)
- `title` - "Détails du véhicule" / "Vehicle Details"
- `generalInfo` - "Informations générales" / "General Information"
- `technicalSpecs` - "Spécifications techniques" / "Technical Specifications"
- `pricingInfo` - "Informations de prix" / "Pricing Information"
- `locationInfo` - "Localisation" / "Location"
- `photoGallery` - "Galerie photos" / "Photo Gallery"

### **common** (Boutons communs)
- `back` - "Retour" / "Back"
- `save` - "Enregistrer" / "Save"
- `cancel` - "Annuler" / "Cancel"
- `delete` - "Supprimer" / "Delete"
- `edit` - "Modifier" / "Edit"
- `view` - "Voir" / "View"
- `yes` - "Oui" / "Yes"
- `no` - "Non" / "No"

---

## ✅ **Instructions générales :**

Pour chaque composant Admin :

1. **Ajoutez l'import** :
   ```javascript
   import { useTranslation } from 'react-i18next';
   ```

2. **Initialisez le hook** :
   ```javascript
   const { t } = useTranslation();
   ```

3. **Remplacez les textes hardcodés** par des appels à `t()` :
   ```javascript
   // Avant
   <Typography>Admin Dashboard</Typography>
   
   // Après  
   <Typography>{t('admin.dashboard.title')}</Typography>
   ```

---

## 🎯 **Exemple pour AdminLogin.js** :

```javascript
import { useTranslation } from 'react-i18next';

function AdminLogin() {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4">{t('admin.login.title')}</Typography>
      <Typography variant="body1">{t('admin.login.subtitle')}</Typography>
      
      <TextField label={t('admin.login.email')} />
      <TextField label={t('admin.login.password')} type="password" />
      
      <Button>{t('admin.login.loginButton')}</Button>
    </Box>
  );
}
```

---

Une fois traduits, les composants Admin seront automatiquement multilingues ! 🚀
