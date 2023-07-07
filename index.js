const containerInput = document.querySelector('.container__input')
const container = document.querySelector('.container')
const containerList = document.querySelector('.container-list')
const contRes = document.querySelector('.contRes')
let searchText

function debounce(callee, timeoutMs) {
    return function perform(...args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()
        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer)
        }
        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
    }
}

function rest(e) {
    searchText = e.target.value
    if (searchText.length === 0) {
        contRes.textContent = ''
        return
    }
    contRes.innerHTML = ''
    getGitHub(`https://api.github.com/search/repositories?q=${searchText}&per_page=5`)
}



containerInput.addEventListener('input', debounce(rest, 500))

function listRepo(objRes) { // вывод в лист
    let count = 0;
    objRes.forEach(element => {
        if (count < 5) {
            let li = document.createElement('li')
            li.classList.add('listName')
            li.textContent = element.name
            li.setAttribute('data-owner', element.owner.login)
            li.setAttribute('data-stars', element.watchers)
            contRes.appendChild(li)

        }
        count++;

    })
}
contRes.addEventListener('click', (e) => {
    addReposList(e.target.textContent, e.target.getAttribute('data-owner'), e.target.getAttribute('data-stars'))
    containerInput.value = ''
    contRes.textContent = ''
});

async function getGitHub(url) {  // функция запроса на сервер
    try {
        const response = await fetch(url)
        const json = await response.json()
        let objRes = json.items
        listRepo(objRes)
    }
    catch (err) {
        document.write(err);
    }
}

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
    buttonDelete.addEventListener('click', e => {
        e.target.closest('div').remove()
    })
}

