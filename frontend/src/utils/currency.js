/**
 * Utility for currency formatting based on locale
 * 
 * Currency mapping:
 * - French (fr) → FCFA (West African CFA franc) - Senegal
 * - English (en) → USD (US Dollar) - United States
 */

// Currency configuration
export const CURRENCY_CONFIG = {
    fr: {
        code: 'XOF', // West African CFA franc
        symbol: 'FCFA',
        locale: 'fr-SN', // Senegal
        position: 'after', // Symbol after the amount
        // Conversion rate: 1 EUR = 655.957 FCFA (fixed rate)
        // You can adjust this or make it dynamic
        conversionRate: 655.957,
    },
    en: {
        code: 'USD', // US Dollar
        symbol: '$',
        locale: 'en-US', // United States
        position: 'before', // Symbol before the amount
        // Conversion rate: 1 EUR = 1.08 USD (approximate, you may want to update this)
        conversionRate: 1.08,
    },
};

/**
 * Get currency configuration based on current language
 * @param {string} language - Current i18n language code
 * @returns {object} Currency configuration
 */
export const getCurrencyConfig = (language) => {
    // Default to French/FCFA if language not found
    return CURRENCY_CONFIG[language] || CURRENCY_CONFIG.fr;
};

/**
 * Format price with appropriate currency based on language
 * @param {number} price - Price in EUR (base currency stored in DB)
 * @param {string} language - Current i18n language code
 * @param {object} options - Optional formatting options
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, language, options = {}) => {
    if (price === null || price === undefined || isNaN(price)) {
        return '';
    }
    const config = getCurrencyConfig(language);

    // Convert price from EUR to target currency
    const convertedPrice = Math.round(price * config.conversionRate);

    // Default formatting options
    const defaultOptions = {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    };

    const formatOptions = {
        ...defaultOptions,
        ...options,
    };

    // Format the number according to locale
    const formattedNumber = new Intl.NumberFormat(config.locale, formatOptions).format(convertedPrice);

    // Position the currency symbol
    if (config.position === 'before') {
        return `${config.symbol}${formattedNumber}`;
    } else {
        return `${formattedNumber} ${config.symbol}`;
    }
};

/**
 * Get currency symbol based on language
 * @param {string} language - Current i18n language code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (language) => {
    const config = getCurrencyConfig(language);
    return config.symbol;
};

/**
 * Convert price from EUR to target currency
 * @param {number} priceInEur - Price in EUR
 * @param {string} language - Current i18n language code
 * @returns {number} Converted price
 */
export const convertPrice = (priceInEur, language) => {
    if (priceInEur === null || priceInEur === undefined || isNaN(priceInEur)) return 0;
    const config = getCurrencyConfig(language);
    return Math.round(priceInEur * config.conversionRate);
};

/**
 * Convert price from target currency back to EUR
 * @param {number} price - Price in target currency
 * @param {string} language - Current i18n language code
 * @returns {number} Price in EUR
 */
export const convertToEur = (price, language) => {
    if (price === null || price === undefined || isNaN(price)) return 0;
    const config = getCurrencyConfig(language);
    return price / config.conversionRate;
};
