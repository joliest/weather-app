
 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    // avoids refreshing upon submit
    e.preventDefault();
    const location = searchElement.value;
    message1.textContent = 'loading...'
    message2.textContent = ''
    if (location) {
        fetch(`/weather?address=${location}`).then((response => {
            // then provides parsed json
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = `Location: ${data.error}`
                } else {
                    message1.textContent = `Location: ${data.location}`
                    message2.textContent = `Forecast: ${data.forecast}`
                }
            })
        }))
    }
})