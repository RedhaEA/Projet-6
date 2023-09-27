document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.gallery');

  // Utilisez fetch pour récupérer les travaux depuis l'API
  fetch('http://localhost:5678/api/works', {
    method: 'GET', // Utilisez la méthode GET pour récupérer les données
    headers: {
      'Content-Type': 'application/json', // Spécifiez le type de contenu JSON
    },
  })
    .then(response => {

      if (!response.ok) {
        throw new Error('Erreur de réseau');
      }
      
      return response.json().then(worksData => {
        // Traitez les données récupérées et ajoutez-les à la galerie.
        worksData.forEach(work => {
          const workElement = document.createElement('div');
          workElement.classList.add('work-item');
          workElement.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}">
          <h3>${work.title}</h3>
          <p>${work.description}</p>
        `;
          gallery.appendChild(workElement);
        });
      })
    })
    .catch(error => {
      console.error('Erreur :', error);
    });
}, false);