'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd        = document.querySelector('.modal__add'),
      addAd           = document.querySelector('.add__ad'),
      modalBtnSubmit  = document.querySelector('.modal__btn-submit'),
      modalSubmit     = document.querySelector('.modal__submit'),
      modalItem       = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning'),
      catalog         = document.querySelector('.catalog'),
      modalFileInput  = document.querySelector('.modal__file-input'),
      modalFileBtn    = document.querySelector('.modal__file-btn'),
      modalImageAdd   = document.querySelector('.modal__image-add');

const textFileBtn   = modalFileBtn.textContent,
      srcModalImage = modalImageAdd.src;

//render card

const renderCard = () => {

    catalog.textContent = '';

    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
            <li class="card" data-id="${i}">
                <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem}</div>
                </div>
            </li>
        `);
    });

}

//render modals

const renderModal = (e) => {
    modalItem.textContent = '';
  
    dataBase.forEach((item, i) => {
      if (i === +e) {
        if (item.status == 'old') {
            item.status = 'Б/У';
        } else if (item.status == 'new') {
            item.status = 'Новый';
        }
        modalItem.insertAdjacentHTML('beforeend', `   
          <div class="modal__block">
            <h2 class="modal__header">Купить</h2>
            <div class="modal__content">
              <div>
                <img class="modal__image modal__image-item" src="data:image/jpeg;base64,${item.image}" alt="test"/>
              </div>
              <div class="modal__description">
                <h3 class="modal__header-item">${item.nameItem}</h3>
                <p>
                  Состояние:
                  <span class="modal__status-item">${item.status}</span>
                </p>
                <p>
                  Описание:
                  <span class="modal__description-item">${item.descriptionItem}</span>
                </p>
                <p>
                  Цена:
                  <span class="modal__cost-item">${item.costItem} ₽</span>
                </p>
                <button class="btn">Купить</button>
              </div>
            </div>
            <button class="modal__close">&#10008;</button>
          </div>   
        `);
      }
    });
  };

//work with data base and photo

const infoPhoto = {};

const saveData = () => localStorage.setItem('awito', JSON.stringify(dataBase));

modalFileInput.addEventListener('change', event => {

    const target = event.target;
    const reader = new FileReader();
    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', event => {
        if (infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = 'Слишком большое фото (более 200KB)';
            modalFileInput.value = '';
            checkForm();
        }
    });

});

//work with submit modal

const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');

const checkForm = () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {

    event.preventDefault();
    const itemObject = {};
    for (const elem of elementsModalSubmit) {
        itemObject[elem.name] = elem.value;
    }

    itemObject.image = infoPhoto.base64;
    dataBase.push(itemObject);
    closeModal({target: modalAdd});
    saveData();
    renderCard();

});

//closing the modals

const closeModal = event => {

    const target = event.target;

    if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        modalSubmit.reset();
        modalImageAdd.src = srcModalImage;
        modalFileBtn.textContent = textFileBtn;
        checkForm();
        document.body.removeEventListener('keydown', closeModal);
    }

};

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

//open modal windows

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.body.addEventListener('keydown', closeModal);
});

catalog.addEventListener('click', event => {

    const target = event.target;

    if(target.closest('.card')) {
        renderModal(target.closest('.card').dataset.id);
        modalItem.classList.remove('hide');
        document.body.addEventListener('keydown', closeModal);
    }

});

renderCard();