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

  if (!swiperWrapper) {
    return;
  }

  // Vider les slides par défaut
  swiperWrapper.innerHTML = '';

  projets.forEach(projet => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="flex-column justify-center align-center p-16 bg-purple">
        <h2 class="w-100 text-center mb-16 jaune">${projet.nom}</h2>
        <h5 class="w-100 text-center mb-16 blanc">Languages utilisés : ${projet.techno}</h5>
        <img src="${projet.image}" alt="${projet.nom}" class="w-100 radius-15 mb-16 pic" style="cursor: pointer;" onclick="window.open('${projet.lien}', '_blank')">
        <a href="${projet.lien}" target="_blank" class="text-center btn-3 top-40"><h4>Voir le projet</h4></a>
      </div>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Initialiser le Swiper après avoir rempli les slides
  initialiserSwiper();
}

// Initialiser le Swiper
function initialiserSwiper() {
  if (window.Swiper) {
    new Swiper('.mySwiper', {
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
}

function initialiserFond() {
  const container = document.querySelector('.triangle-container');
  const glow = document.querySelector('#glow');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  const width = window.innerWidth;
  const height = window.innerHeight;
  const triangleBase = 48;
  const columns = Math.ceil(width / (triangleBase * 2)) + 1;
  const rows = Math.ceil(height / (triangleBase * 1.733)) + 2;

  container.style.setProperty('--columns', columns);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const triangleSet = document.createElement('div');
      triangleSet.className = 'triangle-set';

      if (y % 2 === 0) {
        triangleSet.classList.add('triangle-set--offset');
      }

      container.appendChild(triangleSet);
    }
  }

  if (glow) {
    window.addEventListener('mousemove', (event) => {
      glow.style.top = `${event.clientY}px`;
      glow.style.left = `${event.clientX}px`;
    });
  }
}

window.addEventListener('resize', initialiserFond);

document.addEventListener('DOMContentLoaded', () => {
  chargerProjets();
  initialiserFond();
});