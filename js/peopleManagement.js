class SuperUser {
    constructor(name, sex, birthDate, address, phone, email) {
        this.name = name;
        this.sex = sex;
        this.birthDate = birthDate;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.isDataVisible = true;
    } 
    changeDataVisibility() {
        if (this.isDataVisible == true) {
            return true;
        } else {
            return false;
        }
    }
}
class User extends SuperUser {
    constructor(name, sex, birthDate, address, phone, email) {
        super(name, sex, birthDate, address, phone, email);
        this.isDataVisible = false;
    }
    changeDataVisibility() {
        super.changeDataVisibility();
    }
}
var userList = [];
var rowNumber = 0;
function createNewUser (){
    var name = document.getElementById("name").value;
    var sex = document.getElementById('sex').value;
    var date = document.getElementById('date').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    if (name == '' || sex == '' || address == '' || phone == '' || email == '') {
        alert('Invalid values');
        return;
    }
    if (email.indexOf('@') == -1) {
        alert('Invalid email');
        return;
    }
    if (!(/[0-9]{12}/g).test(phone)) {
        alert('Invalid phone number');
        return;
    }
    for (var i = 0; i < userList.length; i++) {
        if (email == userList[i].email) {
            alert('User with this email already exists');
            return;
        }
        if (phone == userList[i].phone) {
            alert('User with this phone already exists');
            return;
        }
    }
    if (document.querySelector('#super-user').checked) {
        userList.push(new SuperUser(name, sex, date, address, phone, email));
    } else {
        userList.push(new User(name, sex, date, address, phone, email));
    }

}
function newRow (){
    document.querySelector('table').style.display = 'table';
    var table = document.querySelector('tbody');
    var newRow = document.createElement('tr');
    newRow.innerHTML += `<td>${userList[rowNumber].name}</td>`;
    newRow.innerHTML += `<td>${userList[rowNumber].sex}</td>`;
    newRow.innerHTML += `<td>${userList[rowNumber].birthDate}</td>`;
    newRow.innerHTML += `<td>${userList[rowNumber].address}</td>`;
    newRow.innerHTML += `<td>${userList[rowNumber].phone}</td>`;
    newRow.innerHTML += `<td>${userList[rowNumber].email}</td>`;
    if (userList[rowNumber].isDataVisible){
    newRow.innerHTML += `<td >&#10003</td>`;
    }else {
    newRow.innerHTML += `<td >&#10008;</td>`;
    }
    table.appendChild(newRow);
    rowNumber++;
}
function saveUser (){
    createNewUser();
    newRow();
}