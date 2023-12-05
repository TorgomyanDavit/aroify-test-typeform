"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrency = void 0;
function getCurrency(currencyCode) {
    // Map currency codes to their respective symbols
    let currencyCountries = {
        'USD': 'United States Dollar',
        'EUR': 'Euro',
        'AMD': 'Armenia Dram'
    };
    let currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'AMD': '֏'
    };
    const signCharacter = currencySymbols[currencyCode.toUpperCase()] || "";
    const countryOrigin = currencyCountries[currencyCode.toUpperCase()] || "";
    return { signCharacter, countryOrigin, isoCode: currencyCode };
}
exports.getCurrency = getCurrency;
