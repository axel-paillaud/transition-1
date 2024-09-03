import germanyPhoto from "/images/germany-768.avif";
import austriaPhoto from "/images/austria-768.avif";

export const countryObj = {
    germany: {
        id: 1, 
        name: "germany", 
        frName: "Allemagne", 
        photo: germanyPhoto,
        title: 'Sarah & Louis',
        date: 'juillet 2020',
        description: 'Lorem ipsum dolor sit amet',
    },
    austria: {
        id: 2, 
        name: "austria", 
        frName: "Autriche", 
        photo: austriaPhoto,
        title: 'Emma & Arthur',
        date: 'août 2021',
        description: 'Donec non lorem molestie',
    }
};

export const countryCssClasses = Object.values(countryObj).map(country => country.name);
