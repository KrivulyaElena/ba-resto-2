d = document;

let listOfPhones = [];
// создаем новые объект XMLHTTPRequest
let xhr = new XMLHttpRequest();
console.log(xhr);
// конфигурация запроса
//xhr.open('тип запроса гет пост пут','ссылка на файл кот должен обрадотать наш запрос или файл кот хотим получить', синхронно или асинхронно);
xhr.open('GET', 'info.json', true);

// отправляем запрос
//если мы просто получаем  - ничего не передаем, если записываем какие-то данные или хотим получить ответ по 
//нашим критерия то их в виде объекта передаем в send({})
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    //  если код ответа сервера не 200 то это ошибка
    if (xhr.status != 200) {
        console.log(xhr.status + ' - ' + xhr.statusText);
    } else {
        listOfPhones = JSON.parse(xhr.responseText);
        console.log(listOfPhones);
        drawPhones(listOfPhones);
    }
}

var drawPhones = function (phones) {

    let sectionPhones = d.querySelector('.ba-phones');
    if (sectionPhones) {
        phones.forEach(function (element, index) {
            let phoneItem = d.createElement('div'),
                phoneItemTitle = d.createElement('h3'),
                phoneItemImg = d.createElement('img');

            phoneItemTitle.innerText = element.name;
            phoneItemImg.setAttribute('src', element.imageUrl);
            phoneItem.appendChild(phoneItemTitle);
            phoneItem.appendChild(phoneItemImg);
            sectionPhones.appendChild(phoneItem);
        });
    }
}

/// ajax for galler by btn

let galleryBtn = d.querySelector('.js-gallery-ajax');
let ajaxLoadImages = function () {
    let xhrGallery = new XMLHttpRequest();
    xhrGallery.open('GET', 'gallery.json', true);
    xhrGallery.send();


    xhrGallery.onreadystatechange = function () {
        if (xhrGallery.readyState != 4) return;
        //  если код ответа сервера не 200 то это ошибка
        if (xhrGallery.status != 200) {
            console.log(xhr.status + ' - ' + xhrGallery.statusText);
        } else {
            let listOfImages = JSON.parse(xhrGallery.responseText);
            renderGallery(listOfImages);
        }
    }
}

let renderGallery = function (images) {
    images.forEach(function (element) {
        let elementItem = d.createElement('div'),
            elementItemWrapper = d.createElement('div'),
            elementItemImg = d.createElement('img');


        elementItem.classList.add('col-4', 'noPadding');
        elementItemWrapper.classList.add('ba-gallery-item');
        elementItemImg.classList.add('ba-gallery__img');
        elementItemImg.setAttribute('src', element.imageUrl);
        elementItemImg.setAttribute('alt', element.alt);


        elementItemWrapper.appendChild(elementItemImg);
        elementItem.appendChild(elementItemWrapper);
        d.querySelector('.ba-gallery-row').appendChild(elementItem);
    })

}
galleryBtn.addEventListener('click', ajaxLoadImages);


let form = d.querySelector('.ba-contacts-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let xhrLogin = new XMLHttpRequest();
    xhrLogin.open('POST', 'https://reqres.in/api/login', true);
    let loginData = {
        "email": d.querySelector('#email').value,
        "password": d.querySelector('#password').value
    };

    let loginRequestData = JSON.stringify(loginData);

    xhrLogin.send(loginRequestData);

    xhrLogin.onreadystatechange = function () {
        if (xhrLogin.readyState != 4) return;
        if (xhrLogin.status != 200) {
            console.log(xhrLogin)
        } else {
        }

    }
});


let menuBtnAjax = d.querySelector('.js-menu-ajax');


let ajaxMenu = function (e) {
    e.preventDefault();
    let xhrMenu = new XMLHttpRequest();
    xhrMenu.open('GET', 'menu.json', true);
    xhrMenu.send();

    xhrMenu.onreadystatechange = function () {
        if (xhrMenu.readyState != 4) return;
        //  если код ответа сервера не 200 то это ошибка
        if (xhrMenu.status != 200) {
            console.log(xhrMenu.status);
        } else {
            let menuList = JSON.parse(xhrMenu.responseText);
            renderMenu(menuList);
            console.log(menuList);
        }
    }
}

let renderMenu = function (menu) {
    menu.forEach(function (element) {
        let elementUL = d.querySelector('.ba-menu-list'),
            elementLi = d.createElement('li'),
            elementDiv = d.createElement('div'),
            elementH3 = d.createElement('h3'),
            elementP = d.createElement('p'),
            elementStrong = d.createElement('strong');

     
        elementLi.classList.add('ba-menu-item');
        elementDiv.classList.add('ba-menu-item__info');
        elementH3.classList.add('ba-menu-item__title');
        elementP.classList.add('ba-menu-item__desc');
        elementStrong.classList.add('ba-menu-item__price');
        
        elementDiv.appendChild(elementH3);
        elementDiv.appendChild(elementP);       
        elementLi.appendChild(elementDiv);
        elementLi.appendChild(elementStrong);
        elementUL.appendChild(elementLi);
            
        elementH3.innerText = element.title;
        elementP.innerText = element.description;
        elementStrong.innerText = '$' + element.price;

    })
}

menuBtnAjax.addEventListener('click', ajaxMenu);

