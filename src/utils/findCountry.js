export default function findCountryById(countryList, id) {
    return countryList.find((country) => country.id === id);
}
