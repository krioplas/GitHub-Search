const containerInput = document.querySelector('.container__input')
const container = document.querySelector('.container')
const containerList = document.querySelector('.container-list')

function addReposList(name, owner, stars) {
    let cont = document.createDocumentFragment()
    let elem = document.createElement('div')
    let reposText = document.createElement('div')
    let paragraph1 = document.createElement('p')
    let paragraph2 = document.createElement('p')
    let paragraph3 = document.createElement('p')
    let buttonDelete = document.createElement('button')
    elem.classList.add('container-list-repos')
    reposText.classList.add('container-list-repos__text')
    buttonDelete.classList.add('container-list-repos__button')
    paragraph1.textContent = `Name: ${name}`
    paragraph2.textContent = `Owner: ${owner}`
    paragraph3.textContent = `Stars: ${stars}`
    reposText.appendChild(paragraph1)
    reposText.appendChild(paragraph2)
    reposText.appendChild(paragraph3)
    elem.appendChild(reposText)
    elem.appendChild(buttonDelete)
    cont.appendChild(elem)
    containerList.appendChild(cont)
}
function nameList(nameRepo) {
    containerInput.insertAdjacentHTML('afterend', `<span class="listName">${nameRepo}</span>`)
}


function fetchGitHub(text) {
    return fetch(`https://api.github.com/search/repositories?q=${text}&per_page=10`)
        .then(response => response.json())
}


containerInput.addEventListener('input', (event) => {
    text = containerInput.value
    fetchGitHub(text).then(repo => {
        let arrRepo = repo.items;
        arrRepo.forEach(element => {
            nameList(element.name)
        })
    })
})
// const listEl = document.querySelector('.listName')
// listEl






// for (let i = 0; i <= arrRepo.length; i++) {
//     addReposList(arrRepo[i].name, arrRepo[i].owner.login, arrRepo[i].stargazers_count)
//     console.log(arrRepo[i]);
// }



// const debounce = (fn, debounceTime) => {
//     let timer;
//   return function(...argum){
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         fn.apply(this, argum);
//       },debounceTime)
//   }
// };

