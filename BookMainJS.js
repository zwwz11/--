class User {
    name;
    age;
    sex;
}

class Book {
    title;
    author;
}

let userList = [];
let bookList = [];
let RentalList = new Map();
let preViewId = "";

function ShowTargetView(targetId) {
    let isView = false;
    let preView = document.getElementById(preViewId);
    if (preView != null && targetId != preViewId) {
        preView.style.display = 'none';
        isView = false;
    }

    let target = document.getElementById(targetId);
    if (target.style.display == 'none') {
        target.style.display = 'block';
        isView = true;
    }
    else if (target.style.display == '') {
        target.style.display = 'block';
        isView = true;
    }
    else {
        target.style.display = 'none';
        isView = false;
    }
    preViewId = targetId;
    return isView;
}

function AddUser(targetId) {
    let userName = document.getElementById('userName').value;
    let userAge = document.getElementById('userAge').value;
    let userSex = document.querySelector('input[name="userSex"]:checked').value;

    let existUser = userList.filter(x => x.name == userName);
    if (existUser.length != 0) {
        alert("이미 등록된 회원입니다.");
        return;
    }

    if (userName == "" || userAge == "" || userSex == "") {
        alert("입력되지 않은 값이 있습니다.");
        return;
    }

    if (isNaN(userAge)) {
        alert("나이는 숫자만 입력 가능합니다.");
        return;
    }
    let user = new User();
    user.name = userName;
    user.age = userAge;
    user.sex = userSex;

    userList.push(user);
    alert(userName + "회원이 등록되었습니다")

    document.getElementById('userName').value = "";
    document.getElementById('userAge').value = "";
    document.getElementsByName('userSex').forEach((x) => {
        if (x.value == "남자") {
            x.checked = 'checked';
        }
    })
}

function AddBook(targetId) {
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;

    let existBook = bookList.filter(x => x.title == bookTitle);
    if (existBook.length != 0) {
        alert("이미 등록된 도서입니다.");
        return;
    }

    if (bookTitle == "" || bookAuthor == "") {
        alert("입력되지 않은 값이 있습니다.");
        return;
    }

    let book = new Book();
    book.title = bookTitle;
    book.author = bookAuthor;

    bookList.push(book);
    alert(bookTitle + "도서가 등록되었습니다")

    document.getElementById('bookTitle').value = "";
    document.getElementById('bookAuthor').value = "";
}

function ShowUserList(targetId) {
    let isView = ShowTargetView(targetId);
    if (isView == false) return;

    let area = document.getElementById(targetId);
    let newTags = document.getElementsByClassName('user_newTag');
    while (newTags.length != 0) {
        area.removeChild(newTags[0]);
    }

    for (let i = 0; i < userList.length; i++) {
        let newTag = document.createElement('p');
        newTag.setAttribute('class', 'user_newTag');
        newTag.innerHTML = (i + 1) + " : " + userList[i].name + "\t" + userList[i].age + "\t" + userList[i].sex;
        area.appendChild(newTag);
    }
}

function ShowBookList(targetId) {
    let isView = ShowTargetView(targetId);
    if (isView == false) return;

    let area = document.getElementById(targetId);
    let newTags = document.getElementsByClassName('book_newTag');
    while (newTags.length != 0) {
        area.removeChild(newTags[0]);
    }

    for (let i = 0; i < bookList.length; i++) {
        let newTag = document.createElement('p');
        newTag.setAttribute('class', 'book_newTag');
        newTag.innerHTML = (i + 1) + " : " + bookList[i].title + "\t" + bookList[i].author;
        area.appendChild(newTag);
    }
}

function ShowRentalList(targetId) {
    let isView = ShowTargetView(targetId);
    if (isView == false) return;

    let area = document.getElementById(targetId);
    let newTags = document.getElementsByClassName('rental_newTag');
    while (newTags.length != 0) {
        area.removeChild(newTags[0]);
    }


    for (let [key, value] of RentalList) {
        let newTag = document.createElement('p');
        newTag.setAttribute('class', 'rental_newTag');
        newTag.innerHTML = key.title + "=>" + value.name;
        area.appendChild(newTag);
    }
}

function FindUser() {
    let selectUserName = document.getElementById('selectUserName').value;
    if (selectUserName == '') {
        alert("이름을 입력하세요");
        return;
    }

    let findUser = userList.filter(x => x.name == selectUserName);
    if (findUser.length == 0) {
        alert(selectUserName + "은 존재하지 않는 회원입니다.");
        return;
    }

    document.getElementById('findUserName').innerHTML = findUser[0].name;
    document.getElementById('findUserAge').innerHTML = findUser[0].age;
    document.getElementById('findUserSex').innerHTML = findUser[0].sex;
    document.getElementById('changeUserName').value = findUser[0].name;
    document.getElementById('changeUserAge').value = findUser[0].age;
    document.getElementsByName('changeUserSex').forEach((x) => {
        if (x.value == findUser[0].sex) {
            x.checked = 'checked';
        }
    })
    document.getElementById('selectUserName').value = "";
}

function EditUser() {
    if (document.getElementById('findUserName').innerHTML == "") {
        alert("회원을 먼저 조회하세요");
        return;
    }

    let changeUserName = document.getElementById('changeUserName').value;
    let changeUserAge = document.getElementById('changeUserAge').value;
    let changeUserSex = document.querySelector('input[name="changeUserSex"]:checked').value;

    let existUser = userList.filter(x => x.name == changeUserName);
    if (existUser.length != 0) {
        alert("같은 이름의 회원이 존재합니다.");
        return;
    }

    if (changeUserName == "" || changeUserAge == "" || changeUserSex == "") {
        alert("입력되지 않은 값이 있습니다.");
        return;
    }

    if (isNaN(changeUserAge)) {
        alert("나이는 숫자만 입력 가능합니다.");
        return;
    }

    let findUser = userList.filter(x => x.name == document.getElementById('findUserName').innerHTML);
    findUser[0].name = changeUserName;
    findUser[0].age = changeUserAge;
    findUser[0].sex = changeUserSex;
    alert("수정되었습니다.");

    document.getElementById('findUserName').innerHTML = "";
    document.getElementById('findUserAge').innerHTML = "";
    document.getElementById('findUserSex').innerHTML = "";
    document.getElementById('changeUserName').value = "";
    document.getElementById('changeUserAge').value = "";
    document.getElementsByName('changeUserSex').forEach((x) => {
        if (x.value == "남자") {
            x.checked = 'checked';
        }
    })
}

function FindBook() {
    let selectBookTitle = document.getElementById('selectBookTitle').value;
    if (selectBookTitle == '') {
        alert("도서를 입력하세요");
        return;
    }

    let findBook = bookList.filter(x => x.title == selectBookTitle);
    if (findBook.length == 0) {
        alert(selectBookTitle + "은(는) 존재하지 않는 도서입니다.");
        return;
    }

    document.getElementById('findBookTitle').innerHTML = findBook[0].title;
    document.getElementById('findBookAuthor').innerHTML = findBook[0].author;
    document.getElementById('changeBookTitle').value = findBook[0].title;
    document.getElementById('changeBookAuthor').value = findBook[0].author;
    document.getElementById('selectBookTitle').value = "";
}

function EditBook() {
    if (document.getElementById('findBookTitle').innerHTML == "") {
        alert("도서를 먼저 조회하세요");
        return;
    }

    let changeBookTitle = document.getElementById('changeBookTitle').value;
    let changeBookAuthor = document.getElementById('changeBookAuthor').value;

    let existBook = bookList.filter(x => x.name == changeBookTitle);
    if (existBook.length != 0) {
        alert("같은 이름의 도서가 존재합니다.");
        return;
    }

    if (changeBookTitle == "" || changeBookAuthor == "") {
        alert("입력되지 않은 값이 있습니다.");
        return;
    }


    let findBook = bookList.filter(x => x.title == document.getElementById('findBookTitle').innerHTML);
    findBook[0].title = changeBookTitle;
    findBook[0].author = changeBookAuthor;
    alert("수정되었습니다.");

    document.getElementById('findBookTitle').innerHTML = "";
    document.getElementById('findBookAuthor').innerHTML = "";
    document.getElementById('changeBookTitle').value = "";
    document.getElementById('changeBookAuthor').value = "";

}

function DeleteUser() {
    let deleteUserName = document.getElementById('deleteUserName').value;
    if (deleteUserName == '') {
        alert("이름을 입력하세요");
        return;
    }

    let findUser = userList.filter(x => x.name == deleteUserName);
    if (findUser.length == 0) {
        alert(deleteUserName + "은 존재하지 않는 회원입니다.");
        return;
    }

    let delIndex = userList.findIndex(x => x.name == findUser[0].name);
    userList.splice(delIndex);
    alert(deleteUserName + " 회원이 삭제되었습니다.");
    document.getElementById('deleteUserName').value = "";

    for (let [key, value] of RentalList) {
        if (value.name == findUser[0].name) {
            RentalList.delete(key);
        }
    }
}

function DeleteBook() {
    let deleteBookTitle = document.getElementById('deleteBookTitle').value;
    if (deleteBookTitle == '') {
        alert("도서를 입력하세요");
        return;
    }

    let findBook = bookList.filter(x => x.title == deleteBookTitle);
    if (findBook.length == 0) {
        alert(deleteBookTitle + "은 존재하지 않는 도서입니다.");
        return;
    }

    let delIndex = bookList.findIndex(x => x.name == findBook[0].title);
    bookList.splice(delIndex);
    alert(deleteBookTitle + " 도서가 삭제되었습니다.");
    document.getElementById('deleteBookTitle').value = "";

    for (let [key, value] of RentalList) {
        if (key.title == findBook[0].title) {
            RentalList.delete(key);
        }
    }
}

function RentalBook() {
    let rentalBook = document.getElementById('rentalBook').value;
    let rentalUser = document.getElementById('rentalUser').value;

    let findBook = bookList.filter(x => x.title == rentalBook);
    if (findBook.length == 0) {
        alert(rentalBook + "은 존재하지 않는 도서입니다.");
        return;
    }

    let findUser = userList.filter(x => x.name == rentalUser);
    if (findUser.length == 0) {
        alert(rentalUser + "은 존재하지 않는 회원입니다.");
        return;
    }

    for (let [key, value] of RentalList) {
        if (key.title == findBook[0].title) {
            alert(rentalBook + "은 이미 " + rentalUser + "회원에게 대여되었습니다.");
            return;
        }
    }

    RentalList.set(findBook[0], findUser[0]);
    alert(rentalBook + "도서가 " + rentalUser + "회원에게 대여되었습니다.");
    document.getElementById('rentalBook').value = "";
    document.getElementById('rentalUser').value = "";
}

function ReturnBook(){
    let returnBook = document.getElementById('returnBook').value;
    for (let [key, value] of RentalList) {
        if (key.title == returnBook) {
            RentalList.delete(key);
            alert(returnBook + "도서가 반납되었습니다.");
        }
    }
    document.getElementById('returnBook').value = "";
}