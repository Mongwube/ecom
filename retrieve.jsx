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

document.querySelector('#retrieve-form').addEventListener('submit', function(e){
    e.preventDefault()
    const retrieveEmail = document.querySelector('#retrieve-email')
    const retrieveMsg = document.querySelector('.retrieve-msg')
    const resetForm = document.querySelector('#reset-form')

    let transaction = db.transaction(['users'], 'readonly')
    let objectStore = transaction.objectStore('users')
    let index = objectStore.index('email')
    let request = index.get(retrieveEmail.value)

    request.onsuccess = function(){
        if(request.result){
            retrieveMsg.classList.add('success', 'show')
            retrieveMsg.innerHTML = `Your Password is: ${request.result.password}` //password is a keypath.
            resetForm.style.display = 'block'
            resetForm.dataset.email = retrieveEmail.value // link the reset and the retrieve form, 
        }else{
            retrieveMsg.classList.add('error', 'show')
            retrieveMsg.innerHTML = 'Email Does not exist with us.'

            setTimeout(()=>{
            retrieveMsg.classList.remove('error', 'show')
            retrieveMsg.innerHTML = ''
            }, 1000)
        }
    }
    
    request.onerror = function(){
        console.log('error retrieving password.')
        retrieveMsg.classList.add('error', 'show')
        retrieveMsg.innerHTML = 'an error occured while retrieving password.'
        
        setTimeout(()=>{
           retrieveMsg.classList.remove('error', 'show')
           retrieveMsg.innerHTML = ''
        }, 1000)
    }
})


document.querySelector('#reset-form').addEventListener('submit', function(e){
    e.preventDefault()
    const newPassword = document.querySelector('#new-password').value
    const confirmPassword = document.querySelector('#confirm-password').value
    const resetMsg = document.querySelector('#reset-msg')
    const email = e.target.dataset.email

    if(newPassword === confirmPassword){
        let transaction = db.transaction(['users'], 'readwrite')
        let objectStore = transaction.objectStore('users')
        let index = objectStore.index('email')
        let request = index.get(email)

        request.onsuccess = function(){
            let userData = request.result
            if(userData){
                userData.password = newPassword
                let updateRequest = objectStore.put(userData)
                updateRequest.onsuccess = function(){
                    resetMsg.classList.add('success', 'show')
                    resetMsg.innerHTML = 'Password Reset Successful.'
                    setTimeout(()=>{
                        resetMsg.classList.remove('error', 'show')
                        resetMsg.innerHTML = ''
                        window.location.href = 'log.html'
                    }, 3000)
                }
                updateRequest.onerror = function(){
                    resetMsg.classList.add('error', 'show')
                    resetMsg.innerHTML = 'Error Reseting Password, Please Try Again.'
                }
            }
        }
    }else{
        resetMsg.classList.add('error', 'show')
        resetMsg.innerHTML = 'Password did not match'
        setTimeout(()=>{
            resetMsg.classList.remove('error', 'show')
            resetMsg.innerHTML = ''
        }, 5000)
    }

})