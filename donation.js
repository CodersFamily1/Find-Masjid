const scriptURL = 'https://script.google.com/macros/s/AKfycbwAiXxOg7qBIW7vMI4py9wEsWBSQ9L0EyZdBaLoTIMYzuW-M0ReH8MyADrsukRku98/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()

  // ফর্মের ডাটা সাবমিট করুন
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      console.log('Success!', response)

      // নতুন ফাইল ওপেন করুন
      window.location.href = 'Donation_Ok.html';
    })
    .catch(error => console.error('Error!', error.message))
})

function rahi() {
  document.getElementById('btn-sub').innerText = 'possessing..'
}