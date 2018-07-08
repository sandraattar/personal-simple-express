var change = document.getElementsByClassName("change-status");
var hathef = document.getElementsByClassName("delete-posting");
var submitChanges = document.getElementsByClassName("fa-check");

Array.from(change).forEach(function(element){
  element.addEventListener('click', function(){
    const statusText = this.parentNode.childNodes[5].innerText;
    const status= this.parentNode.childNodes[5];
    // create an input element
    const input= document.createElement('input')
    const check= document.createElement('span')
    // add an attribute to the input
    input.setAttribute('value', statusText)

    status.appendChild(input)

    //add attribute to checkmark
    check.setAttribute('class','fa fa-check fas')

    // add event listener
    check.addEventListener('click', submitChangesFunc);
    status.appendChild(check)

  })
})

function submitChangesFunc() {
  const name = this.parentNode.parentNode.childNodes[1].innerText
  const location = this.parentNode.parentNode.childNodes[3].innerText
  const status = this.parentNode.childNodes[1].value

  console.log(status);
  fetch('postings', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name':name,
      'location':location,
      'status': status
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}

Array.from(submitChanges).forEach(function(element) {
      element.addEventListener('click', function(){
        // creating a variable called name that holds
        //parentNode is the parent element
        const note = this.parentNode.parentNode.childNodes[1].innerText
        fetch('notes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'note': note,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(hathef).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText;
        const location = this.parentNode.childNodes[3].innerText;
        const status= this.parentNode.childNodes[5].innerText;

        fetch('postings', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'location':location,
            'status':status
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
