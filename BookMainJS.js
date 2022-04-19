class User{
    name;
    age;
    sex;
}

class Book{
    title;
    author;
}

let userList = [];
let bookList = [];
let preViewId = "";

function ShowTargetView(targetId){
    let isView = false;
    let preView = document.getElementById(preViewId);
    if(preView != null && targetId != preViewId){
        preView.style.display = 'none';
        isView = false;
    }
   
    let target = document.getElementById(targetId);
    if(target.style.display == 'none'){
        target.style.display = 'block';
        isView = true;
    }
    else if(target.style.display == ''){
        target.style.display = 'block';
        isView = true;
    }
    else{
        target.style.display = 'none';
        isView = false;
    }
    preViewId = targetId;
    return isView;
}

function AddUser(targetId){
    let userName = document.getElementById('userName').value;
    let userAge = document.getElementById('userAge').value;
    let userSex = document.querySelector('input[name="userSex"]:checked').value;

    let isExistUser = false;
    userList.forEach(function(e, idx){
        if(e.name == userName){
            alert("이미 등록된 회원입니다.");
            isExistUser = true;
        }
    });

    if(isExistUser){
        return;
    }
    
    if(userName == "" || userAge == "" || userSex == ""){
        alert("입력되지 않은 값이 있습니다.");
        return;
    }

    if(isNaN(userAge)){
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
        if(x.value == "남자"){
            x.checked = 'checked';
        }
    })
}

function AddBook(targetId){
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;

    let isExistBook = false;
    bookList.forEach(function(e, idx){
        if(e.title == bookTitle){
            alert("이미 등록된 도서입니다.");
            isExistBook = true;
        }
    });

    if(isExistBook){
        return;
    }

    if(bookTitle == "" || bookAuthor == ""){
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

function ShowUserList(targetId){
    let isView = ShowTargetView(targetId);
    if(isView == false) return;

    let area = document.getElementById(targetId);
    let newTags = document.getElementsByClassName('newTag');
    let newTagsCount = newTags.length;
    while(newTags.length != 0){
        area.removeChild(newTags[0]);
    }

    for(let i=0; i<userList.length; i++){
        let newTag = document.createElement('p');
        newTag.setAttribute('class', 'newTag');
        newTag.innerHTML = (i+1) + " : " + userList[i].name + "\t" + userList[i].age + "\t" + userList[i].sex;
        area.appendChild(newTag);
    }
}

function ShowBookList(targetId){
    let isView = ShowTargetView(targetId);
    if(isView == false) return;

    let area = document.getElementById(targetId);
    let newTags = document.getElementsByClassName('newTag');
    let newTagsCount = newTags.length;
    while(newTags.length != 0){
        area.removeChild(newTags[0]);
    }

    for(let i=0; i<bookList.length; i++){
        let newTag = document.createElement('p');
        newTag.setAttribute('class', 'newTag');
        newTag.innerHTML = (i+1) + " : " + bookList[i].title + "\t" + bookList[i].author;
        area.appendChild(newTag);
    }
}