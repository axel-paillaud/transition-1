import germanyPhoto from "/images/germany-768.avif";
import austriaPhoto from "/images/austria-768.avif";

export const countryObj = {
    germany: {
        id: 1, name: "germany", frName: "Allemagne", photo: germanyPhoto,
    },
    austria: {
        id: 2, name: "austria", frName: "Autriche", photo: austriaPhoto,
    }
};

export const countryCssClasses = Object.values(countryObj).map(country => country.name);
