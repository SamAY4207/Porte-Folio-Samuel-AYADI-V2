// Charger les données JSON et initialiser le swiper
async function chargerProjets() {
  try {
    const reponse = await fetch('data.json');
    const donnees = await reponse.json();
    remplirSwiper(donnees.projets);
  } catch (erreur) {
    console.error('Erreur lors du chargement des données:', erreur);
  }
}

// Remplir le swiper avec les projets
function remplirSwiper(projets) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  
  // Vider les slides par défaut
  swiperWrapper.innerHTML = '';

  projets.forEach(projet => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="flex-column justify-center align-center p-16 bg-purple">
        <h2 class="w-100 text-center mb-16 jaune">${projet.nom}</h2>
        <h5 class="w-100 text-center mb-16 blanc">Languages utilisés : ${projet.techno}</h5>
        <img src="${projet.image}" alt="${projet.nom}" class="w-100 radius-15 mb-16" style="cursor: pointer;" onclick="window.open('${projet.lien}', '_blank')">
        <a href="${projet.lien}" target="_blank" class="text-center btn-2 top-32"><h4>Voir le projet</h4></a>
      </div>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Initialiser le Swiper après avoir rempli les slides
  initialiserSwiper();
}

// Initialiser le Swiper
function initialiserSwiper() {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', chargerProjets);

const app = TubesCursor(document.getElementById('canvas'), {
  tubes: {
    // Array of base colors for the tube material
    colors: ["#f967fb", "#53bc28", "#6958d5"], 
    lights: {
      // Brightness of the glow (higher = more bloom)
      intensity: 200, 
      // Colors of the light sources casting onto the tubes
      colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
    }
  }
})

myButton.addEventListener('click', () => {
  // Generate 3 random colors for tubes
  app.tubes.setColors(randomColors(3));
});