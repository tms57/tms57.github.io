let link = document.querySelectorAll('.sidenav a')

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener('click', function () {
    // add active class to click link
    link[i].classList.add('active')
    let linkSelected = i

    // remove active class from any previously clicked links...
    for (let z = 0; z < link.length; z++) {
      if (z !== i) {
        link[z].classList.remove('active')
      }
    }
  })
}
