-- Ajout de la colonne 'condition' à la table cars
ALTER TABLE cars 
ADD COLUMN `condition` ENUM('new', 'used') NOT NULL DEFAULT 'used' 
AFTER cylinders;

-- Mise à jour de la colonne 'condition' en fonction du kilométrage
-- Par convention, on considère qu'une voiture avec 0 km est neuve
UPDATE cars 
SET `condition` = CASE 
    WHEN mileage = 0 THEN 'new' 
    ELSE 'used' 
END;
