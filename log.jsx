var db;

window.onload = function () {
  let request = indexedDB.open('EDB2', 1); // Ensure correct version

  request.onerror = function () {
    console.log('Database failed to open');
  };

  request.onsuccess = function () {
    console.log('Database opened successfully');
    db = request.result;
}

}

document.querySelector('#log-form').addEventListener('submit', function(e){
    e.preventDefault()
    const loginEmail = document.querySelector('#log-email')
    const loginPassword = document.querySelector('#log-password')

    const loginMsg = document.querySelector('.login-msg')


    // Setup a query code

    let transaction = db.transaction(['users'], 'readonly')
    let objectStore = transaction.objectStore('users')
    let index = objectStore.index('email')
    let request = index.get(loginEmail.value)
    

    request.onsuccess = function(){
      
        if(request.result && request.result.password === loginPassword.value){
            window.location.href = 'home.html'
        }else{
            loginMsg.classList.add('error', 'show')
            loginMsg.innerHTML = 'Invalid email or password Inputs'
    
            setTimeout(()=>{
               loginMsg.classList.remove('error', 'show')
               loginMsg.innerHTML = ''
            }, 1000)
        }
    }

  request.onerror = function(){
    console.log('error during login')
    loginMsg.classList.add('error', 'show')
            loginMsg.innerHTML = 'an error occured during login'
    
            setTimeout(()=>{
               loginMsg.classList.remove('error', 'show')
               loginMsg.innerHTML = ''
            }, 1000)
  }
   
})