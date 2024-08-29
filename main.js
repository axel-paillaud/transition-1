import "./style.css";

import "./src/components/Loader";
import "./src/components/BackgroundImg";
import "./src/components/Photo";
import "./src/components/Title";
import "./src/components/ImgNav";
import "./src/components/ImgDescription";

// Remove loader and show app on page load
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('app').style.display = 'block';
});
