const conf = config();
const tbody = document.querySelector("#tbody");
const btnAdd = document.querySelector("#btnAjouter");
const btnSubmit = document.querySelector("#submit");
const form = document.querySelector("#form");

$(document).ready(function(){
    getEmployes();
})
// Get
function getEmployes() {
  axios
    .get(conf.getUrl())
    .then(function (response) {
      for (let employe of response.data) {
        afficherEmploye(formatData(employe));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
// post and put
btnAdd.addEventListener('click',function(){
    form.reset();
    btnSubmit.innerText = "Ajouter";
  });
btnSubmit.addEventListener("click", function () {
  console.log(validerFormulaire(form));
  
  if (validerFormulaire(form)) {
    const employe = recupererToutLesInput(form);
    if (btnSubmit.textContent == "Ajouter") {
      addEmploye(employe);
    } else if (btnSubmit.textContent == "Modifier") {
      updateEmploye(employe);
    }
  }
});
// post
function addEmploye(data) {
  delete data._id;
  axios
    .post(conf.getUrl(), data)
    .then(function (response) {
      $("#staticBackdrop").modal("hide");
      tbody.innerHTML = " ";
      getEmployes();
      alert("L'employé ajouté avec succèss");
    })
    .catch(function (error) {
      alert("Une erreure est survenue");
      console.log(error.response);
    });
}
// put
function updateEmploye(data) {
  const id = data._id;
  delete data._id;
  axios
    .put(conf.getUrl(`/${id}`), data)
    .then(function (response) {
      $("#staticBackdrop").modal("hide");
      tbody.innerHTML = " ";
      getEmployes();
      alert("L'employé modifié avec succèss");
    })
    .catch(function (error) {
      alert("Une erreure est survenue");
      console.log(error.response);
    });
}
// Delete
function deleteEmploye(employe) {
  axios
    .delete(conf.getUrl(`/${employe._id}`))
    .then(function (response) {
      $("#staticBackdrop").modal("hide");
      tbody.innerHTML = " ";
      getEmployes();
      alert("L'employé supprimé avec succèss");
    })
    .catch(function (error) {
      alert("Une erreure est survenue");
      console.log(error.response);
    });
}
// Functions utilitaires
function afficherEmploye(data) {
  let newTr = document.createElement("tr");
  for (const attribut in data) {
    if (data.hasOwnProperty(attribut)) {
      let newTd = document.createElement("td");
      newTd.innerHTML = data[attribut];
      newTr.appendChild(newTd);
    }
  }
  // btn ajouter et supprimmer
  newTr.innerHTML += createBntUpdateDelete(data._id);
  tbody.appendChild(newTr);
  addEventListenerInBtnUpdateDelete(data);
}

function formatData(data) {
  return {
    _id: data._id,
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    poste: data.poste,
    numeroTelephone: data.numeroTelephone,
    estMarie: data.estMarie ? "OUI" : "NON",
    pays: data.pays,
  };
}

function recupererToutLesInput(form) {
  const employeObject = {};
  for (const input of form) {
    employeObject[input.name] = input.value;
  }
  return employeObject;
}

function validerFormulaire(formulaire) {
  let error;
  let validated = true;
  for (input of formulaire) {
    if (input.required) {
      error = document.querySelector("#" + input.name + "Error");
      if (input.value == "") {
        validated = false;
        error.innerHTML = `Le champ ${input.name} est requis`;
      } else {
        error.innerHTML = "";
      }
    }
  }
  return validated;
}

function createBntUpdateDelete(employe_id) {
  return `<td>
        <button class="btn-edit btn btn-primary" id="edit-${employe_id}"><i class="fa fa-edit"></i></button>
       <button class="btn-delete btn btn-danger" id="delete-${employe_id}"><i class="fa fa-trash"></i></button>
    </td>`;
}

function addEventListenerInBtnUpdateDelete(employe) {
  const btnEdit = document.getElementById(`edit-${employe._id}`);
  const btnDelete = document.getElementById(`delete-${employe._id}`);
  btnEdit.addEventListener("click", function (e) {
    preremplirFormulaire(form, employe);
    btnSubmit.innerHTML = "Modifier";
    $("#staticBackdrop").modal("show");
  });

  btnDelete.addEventListener("click", function () {
    if (
      confirm(
        `Êtes-vous sûr de supprimer l'employé ${employe.prenom} ${employe.nom} ???`
      )
    ) {
      deleteEmploye(employe);
    }
  });
}

function preremplirFormulaire(form, employe) {
  for (const attribut in employe) {
    if (form[attribut]) {
      form[attribut].value = employe[attribut];
    }
  }
}
