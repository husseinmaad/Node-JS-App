var update = document.getElementById('update')

update.addEventListener('click', function () {
  console.log("test")
    fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'hussein',
      'quote': 'just did an update :)'
    })
  }).then(res => {
  if (res.ok) return res.json()
})
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })

})

var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': '-'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})