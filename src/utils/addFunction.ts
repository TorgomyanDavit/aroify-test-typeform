
export function getCurrency(currencyCode: string) {
    // Map currency codes to their respective symbols
    let currencyCountries: { [key: string]: string } = {
        'USD': 'United States Dollar',
        'EUR': 'Euro',
        'AMD': 'Armenia Dram'
    };

    let currencySymbols: { [key: string]: string } = {
        'USD': '$',
        'EUR': '€',
        'AMD': '֏'
    };

    const signCharacter = currencySymbols[currencyCode.toUpperCase()] || "";
    const countryOrigin = currencyCountries[currencyCode.toUpperCase()] || "";

    return { signCharacter, countryOrigin, isoCode: currencyCode };
}