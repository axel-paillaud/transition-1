import germanyPhoto from "/images/germany-768.avif";
import austriaPhoto from "/images/austria-768.avif";
import sloveniaPhoto from "/images/slovenia-768.avif";

import germanyBackgroundImg from "/images/germany-1920.avif";
import austriaBackgroundImg from "/images/austria-1920.avif";
import sloveniaBackgroundImg from "/images/slovenia-1920.avif";

export const countryObj = {
    germany: {
        id: 1, 
        name: "germany", 
        frName: "Allemagne", 
        photo: germanyPhoto,
        backgroundImg: germanyBackgroundImg,
        title: 'Sarah & Louis',
        date: 'juillet 2020',
        description: 'Lorem ipsum dolor sit amet',
    },
    austria: {
        id: 2, 
        name: "austria", 
        frName: "Autriche", 
        photo: austriaPhoto,
        backgroundImg: austriaBackgroundImg,
        title: 'Emma & Arthur',
        date: 'août 2021',
        description: 'Donec non lorem molestie',
    },
    slovenia: {
        id: 3,
        name: "slovenia",
        frName: "Slovénie",
        photo: sloveniaPhoto,
        backgroundImg: sloveniaBackgroundImg,
        title: 'Lucie et Quentin',
        date: 'novembre 2020',
        description: 'Etiam vulputate lectus id',
    },
};

export const countryCssClasses = Object.values(countryObj).map(country => country.name);
