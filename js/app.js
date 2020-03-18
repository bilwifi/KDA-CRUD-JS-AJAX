const btnAjouter = document.querySelector("#btnAjouter");
const btnSubmit = document.querySelector("#submit");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbody");
// const btnEdit = document.querySelectorAll(".btn-edit");

btnAjouter.addEventListener("click", function() {
  form.reset();
  btnSubmit.innerText = "Ajouter";
});
form.addEventListener("input", function() {
  validateForm(form);
});
//add new employé
btnSubmit.addEventListener("click", function(e) {
  if (validateForm(form)) {
    const employe = createUserObject(form);
    const tr = document.querySelector("#tr-" + employe["_id"]);
    console.log("btnsubmit");
    console.log(tr);
    createRowInTable(tbody, employe, tr);
    form.reset();
    $("#staticBackdrop").modal("hide");
  }
});

//update employé

// My functions
function createUserObject(tagForm) {
  const userObjet = {};
  for (input of tagForm) {
    userObjet[input.name] = input.value;
  }
  userObjet["_id"] =
    userObjet["_id"] != ""
      ? userObjet["_id"]
      : Math.floor(Math.random() * Math.floor(1000));
  return userObjet;
}

function createRowInTable(tagOfTable, objectUser, tagTr) {
  let tr;
  // Si l'utilisateur existe, on fait la modification de la ligne
  if (tagTr) {
    tr = tagTr;
    tr.innerHTML = "";
  } else {
    tr = document.createElement("tr");
    tr.setAttribute("id", "tr-" + objectUser["_id"]);
    tagOfTable.append(tr);

  }
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
  for (input of tagForm) {
    if (input.required) {
      error = document.querySelector("#" + input.name + "Error");
      if (input.value == "") {
        error.innerHTML = `Le champ ${input.name} est requis`;
      } else {
        error.innerHTML = "";
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
}
