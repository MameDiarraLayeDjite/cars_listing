import { useTranslation } from 'react-i18next';
import { formatPrice, getCurrencySymbol, getCurrencyConfig, convertPrice, convertToEur } from '../utils/currency';

/**
 * Custom hook for currency formatting and conversion
 * Automatically uses the current i18n language to determine currency
 * 
 * @returns {object} Currency utilities
 */
export const useCurrency = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    /**
     * Format a price in EUR to the current currency
     * @param {number} priceInEur - Price in EUR (base currency from DB)
     * @param {object} options - Optional Intl.NumberFormat options
     * @returns {string} Formatted price string with currency symbol
     */
    const format = (priceInEur, options = {}) => {
        return formatPrice(priceInEur, currentLanguage, options);
    };

    /**
     * Get the current currency symbol
     * @returns {string} Currency symbol (FCFA or $)
     */
    const symbol = getCurrencySymbol(currentLanguage);

    /**
     * Get the full currency configuration
     * @returns {object} Currency config object
     */
    const config = getCurrencyConfig(currentLanguage);

    /**
     * Convert price from EUR to current currency
     * @param {number} priceInEur - Price in EUR
     * @returns {number} Converted price (without formatting)
     */
    const convert = (priceInEur) => {
        return convertPrice(priceInEur, currentLanguage);
    };

    /**
     * Convert price from current currency to EUR
     * @param {number} price - Price in current currency
     * @returns {number} Price in EUR
     */
    const toEur = (price) => {
        return convertToEur(price, currentLanguage);
    };

    return {
        format,      // Format price with currency symbol
        symbol,      // Get currency symbol
        config,      // Get full currency config
        convert,     // Convert EUR to current currency
        toEur,       // Convert current currency to EUR
    };
};

export default useCurrency;
