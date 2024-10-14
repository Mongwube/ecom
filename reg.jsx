var swiper = new Swiper('.fade', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay:{
        delay: 2500,
        disableOnInteraction: false
    }
})


// index DB for the register page
var db;

window.onload = function () {
  let request = indexedDB.open('EDB2', 1); // Ensure correct version

  request.onerror = function () {
    console.log('Database failed to open');
  };

  request.onsuccess = function () {
    console.log('Database opened successfully');
    db = request.result;

    // Ensure form submission only happens after the DB is ready
    document.querySelector('#my-form').addEventListener('submit', onSubmit);
  };
  

request.onupgradeneeded = function (e) {
    let db = e.target.result;

    // Create 'users' object store if it doesn't exist
    if (!db.objectStoreNames.contains('users')) {
      let objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: true });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('password', 'password', { unique: false });
      console.log('Object store "users" created.');
    }
  };
};

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const msg = document.querySelector('.msg');

document.querySelector('#my-form').addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
  
  
  
    if (nameInput.value === '' || emailInput.value === '' || passwordInput.value === '') {
      msg.classList.add('error');
      msg.innerHTML = "You ain't ready for this Sir/Ma. input your details above.";
  
      setTimeout(() => msg.remove(), 10000);
    } else {
      let newItem = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      };
  
      let transaction = db.transaction(['users'], 'readwrite');
      let objectStore = transaction.objectStore('users');
      let request = objectStore.add(newItem);
  
      request.onsuccess = function () {
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
  
        window.location.href = 'log.html';
      };
  
      transaction.oncomplete = function () {
        console.log('Transaction completed: database modification finished.');
      };
  
      transaction.onerror = function () {
        alert('Already used email or Username');
      };
    }
  }
// document.querySelector('#toggle-password').addEventListener('click', function(){
//     const passwordInput = document.querySelector('#password')
//     const icon = this

//     if(passwordInput.type === 'password'){
//             passwordInput.type = 'text'
//                 icon.textContent = 'visibility'
//              }else{
//                passwordInput.type = 'password'
//                icon.textContent = 'visibility_off'
//             }
// })