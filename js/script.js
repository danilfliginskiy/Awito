'use strict';

const modalAdd       = document.querySelector('.modal__add'),
      addAd          = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit    = document.querySelector('.modal__submit'),
      modalItem      = document.querySelector('.modal__item'),
      cards          = document.querySelectorAll('.card'),
      modals         = document.querySelectorAll('.modal');

//closing the modal window by pressing esc

document.body.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    }
});

//open modal windows

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});

cards.forEach(item => {

    item.addEventListener('click', () => {
        modalItem.classList.remove('hide');
    });

});

//close modal windows by cross and overlay

modals.forEach(item => {

    item.addEventListener('click', event => {

        const target = event.target;
    
        if(target.classList.contains('modal__close') || target === modalAdd || target === modalItem) {
            modalAdd.classList.add('hide');
            modalItem.classList.add('hide');
            modalSubmit.reset();
        }
    
    });

});