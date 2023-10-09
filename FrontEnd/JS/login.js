async function onLoginSubmit() {

    // Je récupere le texte que l'utilisateur a mis dans le champ Email
    let mail = document.getElementById('email').value;
    // Je récupere le texte que l'utilisateur a mis dans le champ Password
    let password = document.getElementById('password').value;

    // J'encapsule les deux dans un objet (comme si je les mettais dans une boite)
    const request = {
        email: mail,
        password: password
    }

    // On fait l'appel fetch vers l'API en donnant le mail / password, et les parametres (POST, Json etc..)
    var response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    // Si la réponse est ok, on insère dans le localStorage, le userId et le Token, puis on redirige
    if (response.ok) {
        // Dans ce cas, la connexion est un succès.
        // Mettre dans le localStorage, et rédiriger vers l'accueil
        var res = await response.json();
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("token", res.token);
        window.location.replace("/FrontEnd/index.html");

    } else {
        // Si la réponse n'est pas ok, on affiche le message d'erreur (en le passant de display none à display block)
        document.getElementById('error-message').style.display = 'block';
    }
}