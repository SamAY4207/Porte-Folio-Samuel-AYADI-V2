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
      <div class="flex-column justify-center align-center border-radius-15 p-16 bg-purple">
        <h2 class="w-100 text-center mb-16 jaune">${projet.nom}</h2>
        <h5 class="w-100 text-center mb-16 blanc">Languages utilisés : ${projet.techno}</h5>
        <img src="${projet.image}" alt="${projet.nom}" class="w-100 radius-15t mb-16" style="cursor: pointer;" onclick="window.open('${projet.lien}', '_blank')">
        <a href="${projet.lien}" target="_blank" class="text-center btn-2"><h4>Voir le projet ↗</h4></a>
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

