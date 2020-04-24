const btnAjouter = document.querySelector("#btnAjouter");
const btnSubmit = document.querySelector("#submit");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbody");

btnAjouter.addEventListener("click", function() {
  form.reset();
  btnSubmit.innerText = "Ajouter";
});
form.addEventListener("input", function() {
  validateForm(form);
});
//add new employé or update employé
btnSubmit.addEventListener("click", function(e) {
  if (validateForm(form)) {
    const employe = createUserObject(form);
    if(e.target.innerText == "Ajouter"){
      const tr = document.querySelector("#tr-" + employe["_id"]);
      createRowInTable(tbody, employe, tr);
      createEmploye(employe);
      form.reset();
      $("#staticBackdrop").modal("hide");
    }else if(e.target.innerText == "Modifier"){
      updateEmploye(employe);
    }else{
      alert("Une erreure est survenue");
    }
  }
  
});

// My functions
function createUserObject(tagForm) {
  const userObjet = {};
  for (input of tagForm) {
    userObjet[input.name] = input.value;
  }
  // userObjet["_id"] =
  //   userObjet["_id"] != ""
  //     ? userObjet["_id"]
  //     : Math.floor(Math.random() * Math.floor(1000));
  return userObjet;
}

function createRowInTable(tagOfTable, objectUser) {
  let tr;
    tr = document.createElement("tr");
    tagOfTable.append(tr);
  for (const attribute in objectUser) {
    if (objectUser.hasOwnProperty(attribute)) {
      td = document.createElement("td");
      td.append(objectUser[attribute]);
      tr.append(td);
    }
  }
  let btn = document.createElement("td");
  btn.innerHTML = createBtnUpdateAndDelete(objectUser._id);
  tr.append(btn);
  addEventListenerInBtnUpdateAndDelete(objectUser);
}

function validateForm(tagForm) {
  let error;
    for (input of tagForm){
        if(input.required){
            error = document.querySelector('#'+input.name+'Error');
            if(input.value ==""){
                error.innerHTML = `Le champ ${input.name} est requis`;
            }else{
                error.innerHTML ='';
            }
        }
    }
    return error.innerHTML == "" ? true : false;
}

function fillForm(tagForm, user) {
  for (attribute in user) {
    if (tagForm[attribute]) {
      tagForm[attribute].value = user[attribute];
    }
  }
}

function createBtnUpdateAndDelete(userId) {
  return `<td>
            <button class="btn-edit btn btn-primary" id="edit-${userId}"><i class="fa fa-edit"></i></button>
             <button class="btn-delete btn btn-danger" id="delete-${userId}"><i class="fa fa-trash"></i></button>
          </td>`;
}

function addEventListenerInBtnUpdateAndDelete(objectUser) {
  const btnEdit = document.querySelector("#edit-" + objectUser._id);
  const btnDelete = document.querySelector("#delete-" + objectUser._id);

  btnEdit.addEventListener("click", function(e) {
    fillForm(form, objectUser);
    btnSubmit.innerText = "Modifier";
    $("#staticBackdrop").modal("show");
  });
  btnDelete.addEventListener("click", function(e) {
    if (
      confirm(
        `Etes-vous sûr de supprimer l'employé ${objectUser.prenom}  ${objectUser.nom}`
      )
    ) {
      deleteEmploye(objectUser._id);
    }
  });
}


// Ajax
const conf = config();

function getListEmploye(){
axios.get(conf.getUrl())
  .then(function(response){
    for (data of response.data){
      createRowInTable(tbody,formatData(data));
    }
      
  })
  .catch(function(error){
    alert('Une erreure est survenue !!! ')
    console.log(error.response)
  })
}

function createEmploye(employe){
  console.log(employe);
  
  delete employe._id;
  axios.post(conf.getUrl(),employe)
    .then(function(response){
      alert("L'employé a été créé avec succès");
    })
    .catch(function(error){
      alert('Une erreure est survenue !!! ')
      console.log(error.response)
    })
  }

function deleteEmploye(id){
  axios.delete(conf.getUrl(`/${id}`))
  .then(function(response){
      alert("L'employé a été supprimer avec succès");
  })
  .catch(function(error){
    alert('Une erreure est survenue !!! ')
    console.log(error.response)
  })
}

function updateEmploye(employe){
  const id = employe._id
  delete employe._id;
  console.log(employe);
  
  axios.put(conf.getUrl(`/${id}`),employe)
  .then(function(response){
      alert("L'employé a été modifier avec succès");
  })
  .catch(function(error){
    alert('Une erreure est survenue !!! ')
    console.log(error)
  })
}

function formatData(data){
  return {
    _id : data._id,
    nom : data.nom,
    prenom : data.prenom,
    email : data.email,
    age : data.age ? data.age : '',
    poste : data.poste,
    numeroTelephone : data.numeroTelephone,
    email : data.email,
    estMarie : data.estMarie ? "OUI" : "NON",
    pays : data.pays,
  }
}
getListEmploye();
