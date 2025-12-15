const tbody = document.querySelector('tbody')
const addStudentBox = document.querySelector('.add-new-student')
const editStudentBox = document.querySelector('.edit-student')
const overlayelm = document.querySelector('.overlay')
const newName = document.getElementById('new_name')
const newEmail = document.getElementById('new_email')
const newPhone = document.getElementById('new_phone')
const addNewStudentBtn = document.querySelector('.add')
const deleteAllStudents = document.querySelector('.delete')
const createNewStudentBtn = document.querySelector('.create')
const totalStudentsCount = document.querySelector(".total-students span")

const currentNameInput = document.querySelector("#current_name")
const currentEmailInput = document.querySelector("#current_email")
const currentPhoneInput = document.querySelector("#current_phone")
let currentUserID;

const cancelCreateBtn = document.querySelector('.cancel-create');
const cancelUpdateBtn = document.querySelector('.cancel-update');

const state = {
    studentsList:[
        {
            ID:1,
            name  :"Omar Khaled",
            email : "o@o.o",
            phone : "0123456789"
        },
        {
            ID:2,
            name  :"Mahmoud Ahmed",
            email : "m@m.m",
            phone : "0123456789"
        }
    ],
    studentsCount:0,
}

function createTableRow(name, email, phone, id) {
    let tr = document.createElement('tr')
    tr.innerHTML = `
        <td class="name" data-id="${id}" >${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td class="actions"><span class="update">Edit</span> <span class="delete">Delete</span></td>
    `
    tbody.appendChild(tr)
}

addNewStudentBtn.addEventListener('click', ()=> {
    overlayelm.classList.remove('none')
    addStudentBox.classList.remove('none')
})

deleteAllStudents.addEventListener('click', ()=> {
    state.studentsList = []
    renderAllStudents(state.studentsList);
})



function applyErrorMode(elm){
    elm.parentElement.classList.add("error")
    elm.parentElement.querySelector('p').classList.remove('none')
}

function removeErrorMode(elm) {
    elm.parentElement.classList.remove("error")
    elm.parentElement.querySelector('p').classList.add('none')
}


cancelCreateBtn.addEventListener('click', ()=> {
    overlayelm.classList.add('none')
    addStudentBox.classList.add('none')
})

cancelUpdateBtn.addEventListener('click', ()=> {    
    overlayelm.classList.add('none')
    editStudentBox.classList.add('none')
})





function validated(){
    
    if(state.studentsList.some(s => s.name === newName.value || newName.value === '')) {
        applyErrorMode(newName)
        return false
    }

    if(newEmail.value === ''){
        applyErrorMode(newEmail)
        return false;
    }

    if(newPhone.value === '') {
        applyErrorMode(newPhone)
        return false;
    }
    
    return true;
}

document.querySelectorAll('input').forEach((e)=> {
    e.addEventListener('input', ()=> {
        if(e.parentElement.classList.contains('error')){
            removeErrorMode(e)
        }
        
    })
})





function createNewStudent() {
    let id =  Date.now();

    state.studentsList.push({
        ID:id,
        name: newName.value.trim(),
        email: newEmail.value.trim(),
        phone: newPhone.value.trim()
     })
     renderAllStudents(state.studentsList)

     newName.value = ''
     newEmail.value = ''
     newPhone.value = ''

     cancelCreateBtn.click()
}





function updateUser(){

    state.studentsList.forEach((s) => {
        if(s.ID === currentUserID) {
            s.name = currentNameInput.value
            s.email = currentEmailInput.value;
            s.phone = currentPhoneInput.value
        }
    })
    currentNameInput.value = ''
    currentEmailInput.value = ''
    currentPhoneInput.value = ''
    currentUserID = 0;
    cancelUpdateBtn.click()
    renderAllStudents(state.studentsList)
    
}



createNewStudentBtn.addEventListener('click', ()=> {
    
    if(validated())
    {
        createNewStudent()
    }
    
})


function renderAllStudents(studentsList) {
    tbody.innerHTML = ''
    studentsList.forEach((s)=> {
            createTableRow(s.name, s.email, s.phone, s.ID)
            
            
        })
        state.studentsCount = state.studentsList.length
        totalStudentsCount.innerText = state.studentsCount
        if(state.studentsCount > 1) {
            deleteAllStudents.classList.remove('none')
        }else {
            deleteAllStudents.classList.add('none')
        }

}


function getUser(id){
    let currentUser;
    currentUser = state.studentsList.filter(s => s.ID === id)
    return currentUser[0];
}


function fillFormInputsWithCurrentUser(user){
    currentNameInput.value = user.name;
    currentEmailInput.value = user.email;
    currentPhoneInput.value = user.phone;    
    currentUserID = user.ID

}


function customeValidate(name, email, phone, id){
    
    
    

    

    
    if(state.studentsList.some(s => s.name === name.value && s.ID !== id)) {
        applyErrorMode(name)
        return false;
    }

    if(email.value === '') {
        applyErrorMode(email)
        return false
    }
    
    if(phone.value === '') {
        applyErrorMode(phone)
        return false
    }

    return true;
}

document.addEventListener("click", (e) => { 
  if (e.target.classList.contains("delete")) {
      let id = e.target.parentElement.parentElement.querySelector('.name').getAttribute('data-id')
      state.studentsList = state.studentsList.filter((s) => s.ID !== Number(id));
      renderAllStudents(state.studentsList)
    }else if (e.target.classList.contains("update")) {        
        let id = e.target.parentElement.parentElement.querySelector('.name').getAttribute('data-id');
        let currentUser = getUser(Number(id))
        fillFormInputsWithCurrentUser(currentUser)

        overlayelm.classList.remove('none')
        editStudentBox.classList.remove('none')        
    }else if (e.target.classList.contains('save')) {
        if(customeValidate(currentNameInput, currentEmailInput, currentPhoneInput, currentUserID)){
            updateUser()
        }
        
    }
});




window.addEventListener("DOMContentLoaded", () => {
    
    
    if(state.studentsList.length > 0) {
        state.studentsCount = state.studentsList.length;
        renderAllStudents(state.studentsList)

    }
})