console.log('Client site js is in running!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('.location')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;

    //messageOne.className = ''
    messageOne.classList.remove('error')
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if( data.error ){
                messageOne.textContent = data.error
                messageOne.classList.add('error')
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })

})