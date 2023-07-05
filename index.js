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

function rest() {
    searchText = containerInput.value
    if (searchText.length === 0) {
        contRes.innerHTML = ''
        return
    }
    contRes.innerHTML = ''
    getGitHub(`https://api.github.com/search/repositories?q=${searchText}&per_page=30`)
}



containerInput.addEventListener('input', debounce(rest, 500))

// contRes.querySelectorAll('.listName').forEach(item => {
//     item.addEventListener('click', () => {
//         console.log('fsdfsdf');
//     });
// });

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
    contRes.querySelectorAll('.listName').forEach(item => {
        item.addEventListener('click', () => {
            containerInput.value = ''
            contRes.innerHTML = ''
            addReposList(item.textContent, item.getAttribute('data-owner'), item.getAttribute('data-stars'))
        });

    });
}



async function getGitHub(url) {  // функция запроса на сервер
    try {
        const response = await fetch(url)
        const json = await response.json()
        let objRes = json.items
        console.log(`запрос на gitHub`);
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
        elem.remove()
    })
}


// element.name[0] === text[0]
 // containerInput.insertAdjacentHTML('afterend', `<li class="listName">${element.name}</li>`)
