const btnSubmit = document.querySelector('#submit');
const form = document.querySelector('#form');
const tbody = document.querySelector('#tbody');

form.addEventListener('input',function(){
    validateForm(form);
})
//add new employé
btnSubmit.addEventListener('click',function(e){
    if(validateForm(form)){
        const employe = createUserObject(form);
        createRowInTable(tbody,employe);
        form.reset();
        $('#staticBackdrop').modal('hide')
    }
})



// My functions
function createUserObject(tagForm){
    const userObjet = {}
    for(input of tagForm){
        userObjet[input.name] = input.value;
    }
    return userObjet;
}

function createRowInTable(tagOfTable,objectUser){
    const tr = document.createElement('tr');
    for (const attribute in objectUser) {
        if (objectUser.hasOwnProperty(attribute)) {
          td = document.createElement('td');
          td.append(objectUser[attribute]);
          tr.append(td);  
        }
    }
    tagOfTable.append(tr);
}

function validateForm(tagForm){
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