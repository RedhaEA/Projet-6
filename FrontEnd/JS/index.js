document.addEventListener(
  'DOMContentLoaded',
  function () {
    // Tout le code ici s'execute une fois le document chargé

    //Appel de la function "fetchWorks", présente plus bas dans le code.
    fetchWorks();

    // Récupération des buttons
    const loginBtn = document.getElementById("login");
    const disconnectBtn = document.getElementById("disconnect");
    const closeModalBtn = document.getElementById("closeModaleBtn");
    const modifyButton = document.getElementById("modify-projects");
    // Ajout de l'event pour fermer la modale
    closeModalBtn.addEventListener("click", closeModal);

    // Ajout de l'event déconnexion
    disconnectBtn.addEventListener("click", () => {
      localStorage.clear();
      this.location.reload();
    });

    //Si on est connecté
    if (isConnected()) {
      loginBtn.classList.add("display-none");
      disconnectBtn.classList.remove("display-none");
    } else {
      //Sinon
      loginBtn.classList.remove("display-none");
      disconnectBtn.classList.add("display-none");
    }

    // Si on est connecté, on affiche également le button "modifier"
    if (isConnected())
      modifyButton.classList.remove("display-none");
  },
  false
)

function isConnected() {
  var token = localStorage.getItem("token");

  if (token != null) {
    return true;
  } else {
    return false;
  }
}

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

// Function pour ouvrir la modale 
function openModal() {
  const modal = document.getElementById("modale");
  modal.style.visibility = "visible";
}

// Function pour fermer la modale 
function closeModal() {
  const modal = document.getElementById("modale");
  modal.style.visibility = "hidden";
}

function fetchWorks() {
  const filters = document.querySelectorAll('.filters button');

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
    });
}

