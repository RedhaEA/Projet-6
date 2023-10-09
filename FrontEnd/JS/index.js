document.addEventListener(
  'DOMContentLoaded',
  function () {
    const filters = document.querySelectorAll('.filters button')

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

// Login 
// const loginButton = document.getElementById('submit'); // Sélectionnez le bouton de connexion

// loginButton.addEventListener('click', () => {
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   const userData = {
//     email: email,
//     password: password
//   };

//   // Utilisez fetch pour envoyer les données d'authentification au serveur
//   fetch('http://localhost:5678/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userData)
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Erreur de connexion');
//       }
//       // Gérer la réponse du serveur (redirection, affichage de messages, etc.)
//       // Vous pouvez ajouter des actions supplémentaires ici en fonction de la réponse du serveur.
//       console.log('Connecté avec succès !');
//     })
//     .catch(error => {
//       console.error('Erreur de connexion :', error);
//     });
// });

// Modal

if (data.userId) {
  // Afficher la modal
  const modal = document.getElementById('myModal');
  const closeModal = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';

  // Fermer la modal lorsqu'on clique sur le bouton de fermeture
  closeModal.onclick = function () {
    modal.style.display = 'none';
  };

  // Fermer la modal si l'utilisateur clique en dehors de la modal
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}