'use strict';

const dataBase = [];

const modalAdd        = document.querySelector('.modal__add'),
      addAd           = document.querySelector('.add__ad'),
      modalBtnSubmit  = document.querySelector('.modal__btn-submit'),
      modalSubmit     = document.querySelector('.modal__submit'),
      modalItem       = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning'),
      catalog         = document.querySelector('.catalog'),
      modals          = document.querySelectorAll('.modal');

//work with modals

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');

modalSubmit.addEventListener('input', () => {

    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';

});

modalSubmit.addEventListener('submit', event => {

    event.preventDefault();
    const itemObject = {};
    for (const elem of elementsModalSubmit) {
        itemObject[elem.name] = elem.value;
    }

    dataBase.push(itemObject);
    modalSubmit.reset();
    modalBtnSubmit.disabled = true;
    modalBtnWarning.style.display = 'flex';

});

//closing the modals

const closeModal = function(event) {

    const target = event.target;

    if (target.closest('.modal__close') || target === modalAdd || target === modalItem || event.code === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        modalSubmit.reset();
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
        modalItem.classList.remove('hide');
        document.body.addEventListener('keydown', closeModal);
    }

});