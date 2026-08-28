export interface Currency {
  code: string; // ISO 4217 code (e.g., 'EGP')
  name: string; // English display name
  nativeName: string; // Arabic display name
  symbol: string; // Latin symbol/abbreviation
  symbolNative: string; // Arabic symbol
  symbolPosition: "prefix" | "suffix";
  decimalPlaces: number;
  thousandsSeparator: string;
  decimalSeparator: string;
}

export type SupportedCurrencyCode =
  // Arab Currencies
  | "EGP" // Egypt
  | "SAR" // Saudi Arabia
  | "AED" // United Arab Emirates
  | "KWD" // Kuwait
  | "QAR" // Qatar
  | "OMR" // Oman
  | "BHD" // Bahrain
  | "JOD" // Jordan
  | "MAD" // Morocco
  // Major Global Currencies
  | "USD"
  | "EUR"
  | "GBP";

export const CURRENCIES: Record<SupportedCurrencyCode, Currency> = {
  // --- Arab Currencies ---
  EGP: {
    code: "EGP",
    name: "Egyptian Pound",
    nativeName: "جنيه مصري",
    symbol: "E£",
    symbolNative: "ج.م",
    symbolPosition: "prefix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  SAR: {
    code: "SAR",
    name: "Saudi Riyal",
    nativeName: "ريال سعودي",
    symbol: "SAR",
    symbolNative: "ر.س",
    symbolPosition: "suffix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  AED: {
    code: "AED",
    name: "UAE Dirham",
    nativeName: "درهم إماراتي",
    symbol: "AED",
    symbolNative: "د.إ",
    symbolPosition: "suffix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  KWD: {
    code: "KWD",
    name: "Kuwaiti Dinar",
    nativeName: "دينار كويتي",
    symbol: "KD",
    symbolNative: "د.ك",
    symbolPosition: "suffix",
    decimalPlaces: 3, // KWD uses 3 decimal places (fils)
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  QAR: {
    code: "QAR",
    name: "Qatari Riyal",
    nativeName: "ريال قطري",
    symbol: "QR",
    symbolNative: "ر.ق",
    symbolPosition: "suffix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  OMR: {
    code: "OMR",
    name: "Omani Rial",
    nativeName: "ريال عماني",
    symbol: "RO",
    symbolNative: "ر.ع",
    symbolPosition: "suffix",
    decimalPlaces: 3, // OMR uses 3 decimal places (baisa)
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  BHD: {
    code: "BHD",
    name: "Bahraini Dinar",
    nativeName: "دينار بحريني",
    symbol: "BD",
    symbolNative: "د.ب",
    symbolPosition: "suffix",
    decimalPlaces: 3, // BHD uses 3 decimal places (fils)
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  JOD: {
    code: "JOD",
    name: "Jordanian Dinar",
    nativeName: "دينار أردني",
    symbol: "JD",
    symbolNative: "د.أ",
    symbolPosition: "suffix",
    decimalPlaces: 3, // JOD uses 3 decimal places (piastres/fils)
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  MAD: {
    code: "MAD",
    name: "Moroccan Dirham",
    nativeName: "درهم مغربي",
    symbol: "DH",
    symbolNative: "د.م",
    symbolPosition: "suffix",
    decimalPlaces: 2,
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },

  // --- Major Global Currencies ---
  USD: {
    code: "USD",
    name: "US Dollar",
    nativeName: "دولار أمريكي",
    symbol: "$",
    symbolNative: "$",
    symbolPosition: "prefix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    nativeName: "يورو",
    symbol: "€",
    symbolNative: "€",
    symbolPosition: "suffix",
    decimalPlaces: 2,
    thousandsSeparator: " ",
    decimalSeparator: ",",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    nativeName: "جنيه إسترليني",
    symbol: "£",
    symbolNative: "£",
    symbolPosition: "prefix",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
  },
};

export interface FormatOptions {
  locale?: string;
  useNativeSymbol?: boolean;
}

/**
 * Formats a numeric amount using the Currency definition and Intl.NumberFormat
 */
export function formatCurrency(
  amount: number,
  currencyCode: SupportedCurrencyCode,
  options?: FormatOptions,
): string {
  const currency = CURRENCIES[currencyCode];
  const locale =
    options?.locale ?? (options?.useNativeSymbol ? "ar-EG" : "en-US");

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(amount);
}

// Example usage:
// formatCurrency(1500.5, 'EGP')                    // "EGP 1,500.50" or "E£1,500.50"
// formatCurrency(1500.5, 'EGP', { locale: 'ar-EG' }) // "١٬٥٠٠٫٥٠ ج.م.‏"
// formatCurrency(45.125, 'KWD')                    // "KWD 45.125" (respects 3 decimal places)
const currency = CURRENCIES.EGP;

export default currency;
