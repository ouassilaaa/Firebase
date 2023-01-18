//config de notre appli 
const firebaseConfig = {

    apiKey: "AIzaSyDvzIECU3iM8ve6p_1OcsRvpX8HidldiUU",
  
    authDomain: "js-project-80f97.firebaseapp.com",
  
    databaseURL: "https://js-project-80f97-default-rtdb.firebaseio.com",
  
    projectId: "js-project-80f97",
  
    storageBucket: "js-project-80f97.appspot.com",
  
    messagingSenderId: "1054724885382",
  
    appId: "1:1054724885382:web:f01029012e3aab35de7a07",
  
    measurementId: "G-RLZF5RETBH"
  
  };
  firebase.initializeApp(firebaseConfig);
//initialisation 


//1 référence à notre BDD
const dbRef=firebase.database().ref(); 

//référence à notre table users dans la BDD 
const usersRef=dbRef.child('users'); 

//!-------------FIREBASE-------------------
//TODO : Faire setup ensemble
//TODO : Créer une ƒ° readUserData
//TODO : dans cette ƒ° on va stocker l'élement HTML qui a l'id 'user-list' dans une variable userListUI
//TODO : sur la variable usersRef on va utiliser une fonction .on()
//? Pour info .on() va s'utiliser comme un addEventListener
//TODO : 1er param de .on(), une string qui dit "value" (en gros dans la bdd on surveille si ya des changements de value)
//TODO : 2e param de .on(), une ƒ° fléchée qui prend un paramètre snap
//TODO : Dans la fonction fléchée : on va assigner une string vide au innerHTML de userListUI
//TODO : Sur la variable snap on va utiliser un forEach pour parcourir le tableau avec une variable temporaire childSnap
//TODO : Dans le forEach : dans une variable key on va stocker childSnap.key
//TODO : Dans le forEach : dans une variable value on va stocker childSnap.val()
//TODO : Dans le forEach : dans une variable $li on va créer un element <li></li>
//TODO : Dans le forEach : dans le innerHTML de $li on lui assigne value.name
//TODO : Dans le forEach : Sur la $li on lui rajoute un attribut 'user-key', on lui assignera la valeur stockée dans key
function readUserData(){
    const userListUI = document.getElementById('user-list');
    //*Comme un addEventListener, sur notre BDD on ecoute des changements de "value" 
    //* et quand ya des changement on execute une fonction.
    usersRef.on('value', snap =>{
        userListUI.innerHTML = '';
        snap.forEach(childSnap=>{
            //* Key va stocker les ID
            let key = childSnap.key;
            console.log('la key : ', key);
            //* value va stocker la valeur associée à la Key 
            let value = childSnap.val();
            console.log('la valeur : ', value);
            //*a la lecture de notre BDD pour chaque clé-valeur on créer une <li></li>
            let $li = document.createElement('li');
            //*On rempli la <li></li> avec le name 
            $li.innerText = value.name;
            //*On place un attribut avec l'id sur chaque 
            $li.setAttribute('user-key', key);
            userListUI.append($li);
        })
    })
}

readUserData(); 

//* LIRE 1 USER
//TODO: Dans readUserData avant le append(), on va placer un addEventListener sur $li qui écoute « click » et lance la fonction userClicked
//TODO: Ensuite Créer la fonction userClicked qui va capter un évènement 
//TODO: Dans la ƒ° userClicked, Dans 1 variable userID, on va récupérer userID via event.target.getAttribute("user-key");
//TODO: Dans la ƒ° userClicked, 1 variable userRef va faire référence à 1 utilisateur en particulier, on lui assigne dbRef,on utilise la fonction child() pour viser le noeud “users/“ concaténé avec userID
//TODO: Dans la ƒ° userClicked, 1 variable userDetailUI récupère ma div avec  user-detail
//TODO: Dans la ƒ° userClicked, Ensuite sur userRef on utilise la fonction on("value", snap =>{ })
//TODO: Dans la ƒ° userClicked, Dans la fonction => , on va vider l’innerHTML de userDetailUI
//TODO: Dans la ƒ° userClicked, Ensuite sur snap on va utiliser un forEach pour parcourir le cliché (snap) de notre BDD.
//TODO: Dans la ƒ° userClicked dans le forEach, 1 variable $p créée un élément <p>
//TODO: Dans la ƒ° userClicked dans le forEach, On rempli le innerHTML de $p avec childSnap.key et childSnap.val()
//TODO: Dans la ƒ° userClicked dans le forEach, On rajoute $p dans notre userDetailUI


const userRef = dbRef.child('users/' + userID);
function userClicked(event){
    //*On récupère l'id que l'on avait placé dans readUserData (cf. setAttribute)
    console.log(event);
    let userID = event.target.getAttribute('user-key');
    const userRef = dbRef.child('users/' + userID);
    console.log(userRef);
    const userDetailUI = document.querySelector('#user-detail');
    userRef.on('value', snap=>{
        userDetailUI.innerHTML="";
        snap.forEach(childSnap=>{
            let $p = document.createElement('p');
            $p.innerText = childSnap.key +'-'+childSnap.val();
            userDetailUI.append($p);
        })
    })
}

//* AJOUTER
//TODO 1: Récupérer le bouton avec l’id add-user-btn
//TODO 2: sur ce bouton placer un addEventlistener au click et qui lance la fonction addBtnClicked
//TODO 3: Créer la fonction addUserBtnClicked 
//TODO 4: Dans la ƒ° addUserBtnClicked, Récupérer la référence à notre BDD directement sur le noeud users
//TODO 5: Dans la ƒ° addUserBtnClicked, Récupérer dans 1 variable addUserInputsUI (les input pour rajouter un user qui ont la classe user-input)conseil utiliser getElementsByClassName
//TODO 6: Dans la ƒ° addUserBtnClicked, créer une variable newUser (qui est un objet vide)
//TODO 7: Dans la ƒ° addUserBtnClicked, faire une boucle for pour parcourir les input dans addUserInputsUI
//TODO 8: Dans la Boucle, Pour chaque éléments parcourus on récupère Dans 1 variable key = addUserInputsUI[i].getAttribute('data-key');
//TODO 9: Dans la boucle, 1 variable value = addUserInputsUI[I].value
//TODO 10: Dans la boucle, Pour chaque clé (âge, name, email) on l’associe à notre nouvel utilisateur :  newUser[key] = value 
//TODO 11: après le parcours des inputs, on va faire un push dans la référence à users dans notre bdd
//TODO 12: Dans la ƒ° addUserBtnClicked, on console log un msg type nouvel utilisateur enregistré 
//TODO 13: Dans la ƒ° addUserBtnClicked, On console log le nom et l’âge du nouvel utilisateur
//TODO 14: Dans la ƒ° addUserBtnClicked, On ré initialise le formulaire avec l’id leFormulaireAjout 

const addUserBtnUI = document.querySelector('#add-user-btn');
addUserBtnUI.addEventListener('click', addUserBtnClicked);

function addUserBtnClicked(){
    //* on fait une reférence à notre noeud users
    // const usersRef = dbRef.child('users');
    //* Ensuite on Récupère les 3 inputs (pour renseigner un nom, un age, un mail)
    const addUserInputsUI = document.getElementsByClassName('user-input');
    console.log(addUserInputsUI);
     //* On crée un objet (vide pour le moment) va stocker les infos du nouvel utilisateur
    let newUser = {};
    //* On fait une boucle pour récupérer les valeurs de chaque input dans le formulaire
    for(let i=0; i<addUserInputsUI.length;i++){
    //* Ci dessous on récupère les key et value (on a des attributs data-key déjà placé en html)
    let key = addUserInputsUI[i].getAttribute('data-key');
    //* Pour chaque input on récupère la value.    
    let value = addUserInputsUI[i].value;
    console.log(`
    Les Key :${key}
    Les value:${value}`);
    //* Pour chaque CLé (age, name, et email on les associe à notre nouvel utilisateur)
        newUser[key] = value;
    }// Fin de la boucle FOR
    //* Enfin on ajoute notre nouvel utilisateur dans la BDD avec .push()
    usersRef.push(newUser);
    console.log(`YOOO on a ajouté ${newUser.name} dans la BDD, il a ${newUser.age} ans`)
    //* Pour + de confort on reset le formulaire une fois qu'on a ajouté un user
    document.getElementById('leFormulaireAjout').reset();
}

//* SUPPRIMER
//TODO 1: Dans la ƒ° readUserData, dans le forEach, juste avant $li.innerHtml = …
//TODO 2: Dans la ƒ° readUserData, dans le forEach, On va déclarer une variable deleteIconUI dans laquelle on va créer un élément span
//TODO 3: Dans la ƒ° readUserData, dans le forEach, On va ensuite modifier la class de deleteIconUI en « delete-user »
//TODO 4: Dans la ƒ° readUserData, dans le forEach, On va remplir le innerHTML de deleteIconUI avec un « X » 
//TODO 5: Dans la ƒ° readUserData, dans le forEach, deleteIconUI on lui rajoute un attribut « userid » qui prendra la valeur de key( via setAttribute)
//TODO 6: Dans la ƒ° readUserData, dans le forEach, Enfin sur deleteIconUI on place un addEventListener qui écoute le click et lance la fonction deleteButtonClicked
//TODO 7: Créer une fonction deleteButtonClicked qui prend event en paramètre 
//TODO 8: Dans la ƒ° deleteButtonClicked, récupérer le userID via event.target.getAttribute 
//TODO 9: Dans la ƒ° deleteButtonClicked,Faire une référence userRef à notre BDD directement sur le noeud de l’utilisateur qu’on a cliqué (référence à la table users + userID)
//TODO 10: Dans la ƒ° deleteButtonClicked,utiliser la fonction remove sur userRef

function readUserData(){
    const userListUI = document.getElementById('user-list');
    //*Comme un addEventListener, sur notre BDD on ecoute des changements de "value" 
    //* et quand ya des changement on execute une fonction.
    usersRef.on('value', snap =>{
        userListUI.innerHTML = '';
        snap.forEach(childSnap=>{
            //* Key va stocker les ID
            let key = childSnap.key;
            console.log('la key : ', key);
            //* value va stocker la valeur associée à la Key 
            let value = childSnap.val();
            console.log('la valeur : ', value);
            //*a la lecture de notre BDD pour chaque clé-valeur on créer une <li></li>
            let $li = document.createElement('li');
            //* On crée l'icone pour DELETE
            let deleteIconUI = document.createElement('span');
            deleteIconUI.class = 'delete-user';
            deleteIconUI.innerText = "❌";
            deleteIconUI.setAttribute('userid',key);
            deleteIconUI.addEventListener('click', deleteButtonClicked);
            //*Fin icon delete 
            //*On rempli la <li></li> avec le name 
            $li.innerText = value.name;
            //*On place un attribut avec l'id dans un attribut user-key sur chaque <li></li>
            $li.setAttribute('user-key', key);
            $li.addEventListener("click", userClicked);
            $li.append(deleteIconUI);
            userListUI.append($li);
        })
    })
};



 
