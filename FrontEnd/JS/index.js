document.addEventListener(
  'DOMContentLoaded',
  function () {
    const filters = document.querySelectorAll('.filters button')
    const buttonProjects = document.querySelectorAll(".open-modal");
    

    // Utilisez fetch pour récupérer les travaux depuis l'API
    fetch('http://localhost:5678/api/works', {
      method: 'GET', // Utilisez la méthode GET pour récupérer les données
      headers: {
        'Content-Type': 'application/json' // Spécifiez le type de contenu JSON
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de réseau')
        }
        return response.json().then(worksData => {
          let filteredWorks = worksData
          filters.forEach(filterButton => {
            filterButton.addEventListener('click', () => {
              filteredWorks = worksData.filter(
                work =>
                  work.category.name === filterButton.textContent ||
                  filterButton.textContent === 'Tous'
              )
              displayWorks(filteredWorks)
            })
          })
          displayWorks(filteredWorks)
        })
      })
      .catch(error => {
        console.error('Erreur :', error)
      })
  },
  false
)

const displayWorks = works => {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  works.forEach(work => {
    const workElement = document.createElement('div')
    workElement.classList.add('work-item')
    workElement.innerHTML = `
  <img src="${work.imageUrl}" alt="${work.title}">
  <h3>${work.title}</h3>
  <p>${work.description}</p>
`
    gallery.appendChild(workElement)
  })
}

function openModal() {
  const modal = document.getElementById("modale");
  modal.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById("modale");
  modal.style.display = "none";
}

// Lorsqu'un bouton est cliqué, ouvrir la modale
const openButton = document.querySelector(".open-modal");
openButton.addEventListener("click", openModal);

// Lorsqu'un bouton de fermeture est cliqué, fermer la modale
const closeButton = document.querySelector(".closeModale");
closeButton.addEventListener("click", closeModal);