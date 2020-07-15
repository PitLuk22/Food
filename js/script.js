"use scrict";
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';
import parser from './modules/parser';
import {
    openModal
} from './modules/modal';

document.addEventListener("DOMContentLoaded", function () {

    let openModalTimerId = setTimeout(function () {
        openModal('.modal', openModalTimerId);
    }, 1000 * 60 * 10);


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-07-21');
    modal('button[data-modal]', '.modal', openModalTimerId);
    cards();
    calc();
    forms('form', openModalTimerId);
    parser();
    slider({
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        sliderWrapper: '.offer__slider-wrapper',
        innerField: '.offer__slider-inner'
    });

});