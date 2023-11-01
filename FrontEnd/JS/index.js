document.addEventListener(
  'DOMContentLoaded',
  function () {
    // Tout le code ici s'execute une fois le document chargé

    //Appel de la function "fetchWorks", présente plus bas dans le code.
    fetchWorks(false);

    // Récupération des buttons
    const loginBtn = document.getElementById("login");
    const disconnectBtn = document.getElementById("disconnect");
    const closeModalBtn = document.getElementById("closeModaleBtn");
    const backModalBtn = document.getElementById("backModalBtn");
    const modifyButton = document.getElementById("modify-projects");
    // Ajout de l'event pour fermer la modale
    closeModalBtn.addEventListener("click", closeModal);
    backModalBtn.addEventListener("click", showGallery);
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

const displayWorks = (works, forModal) => {
  var gallery = document.querySelector('.gallery')

  if (forModal) {
    gallery = document.querySelector('.modal-gallery');
  }

  gallery.innerHTML = ''
  works.forEach(work => {
    const workElement = document.createElement('div')
    workElement.classList.add('work-item')

    if (forModal) {
      workElement.innerHTML = `
          <div>
          <button class="trash-btn" onclick="deleteWork(${work.id})">
          <i class="fa fa-light fa-trash-can"  aria-hidden="true"></i>
          </button>
          <img src="${work.imageUrl}" alt="${work.title}"/>
          <h3>${work.title}</h3>
          <p>${work.description}</p>
          </div>`
    } else {
      workElement.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}"/>
          <h3>${work.title}</h3>
          <p>${work.description}</p>`
    }

    gallery.appendChild(workElement)
  })
}

// Function pour ouvrir la modale 
function openModal() {
  const modal = document.getElementById("modale");
  modal.style.visibility = "visible";
  showGallery();
  fetchWorks(true);
}

async function deleteWork(id) {
  let token = localStorage.getItem("token");
  var response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (response.ok) {
    closeModal();
  }
}

// Function pour fermer la modale 
function closeModal() {
  const modal = document.getElementById("modale");
  modal.style.visibility = "hidden";
  document.getElementsByClassName("modal-gallery")[0].style.visibility = "hidden";
  document.getElementsByClassName("modal-add-project")[0].style.visibility = "hidden";
  document.getElementById("addProjectBtn").style.visibility = "hidden";
  document.getElementById("confirmProjectBtn").style.visibility = "hidden";
}

function fetchWorks(forModal) {
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
            displayWorks(filteredWorks, forModal)
          })
        })
        displayWorks(filteredWorks, forModal)
      })
    })
    .catch(error => {
      console.error('Erreur :', error)
    });
}

function onAddProjectClick() {
  showAddProjectForm();
}

function showGallery() {
  document.getElementById("modal-title").innerHTML = "Galerie Photo";
  document.getElementsByClassName("modal-gallery")[0].style.visibility = "visible";
  document.getElementsByClassName("modal-add-project")[0].style.visibility = "collapse";
  document.getElementById("addProjectBtn").style.visibility = "visible";
  document.getElementById("confirmProjectBtn").style.visibility = "collapse";
  document.getElementById("backModalBtn").style.visibility = "collapse";
}

async function showAddProjectForm() {
  document.getElementById("modal-title").innerHTML = "Ajout Photo";
  document.getElementsByClassName("modal-gallery")[0].style.visibility = "collapse";
  document.getElementsByClassName("modal-add-project")[0].style.visibility = "visible";
  document.getElementById("addProjectBtn").style.visibility = "collapse";
  document.getElementById("confirmProjectBtn").style.visibility = "visible";
  document.getElementById("backModalBtn").style.visibility = "visible";

  let response = await fetch(`http://localhost:5678/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  var select = document.getElementById("category-select");
  select.innerHTML = '';
  if (response.ok) {
    var categories = await response.json();
    categories.forEach(category => {
      var option = document.createElement("option");
      option.text = category.name;
      option.value = parseInt(category.id);
      select.appendChild(option)
    });
  }
}

async function postWork() {
  const postWorkForm = document.getElementsByClassName("add-project-form")[0];
  const token = localStorage.getItem('token');

  var response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: new FormData(postWorkForm),
  });

  if (response.ok) {
    closeModal();
  }

}
