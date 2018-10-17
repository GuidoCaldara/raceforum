/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import {formRace} from "components/new_race_form.js"
import L from 'leaflet'
import {renderMap} from "components/show-map.js"
import {autoUpload} from "components/auto_upload.js"
formRace()
renderMap()
autoUpload()

document.addEventListener("DOMContentLoaded", function (event) {

var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems);

var modals = document.querySelectorAll('.modal')
if (modals != null) {
  var instances = M.Modal.init(modals)
}

var collapsible = document.querySelectorAll('.collapsible');
if (collapsible != null) {
  var instances = M.Collapsible.init(collapsible);
}

var tabs = document.querySelectorAll('.tabs');
if (tabs != null) {
  var instance = M.Tabs.init(tabs);
}

const openPhotoFormModal = document.querySelector("#open-photo-form-modal")
const openReviewFormModal = document.querySelector("#open-review-form-modal")
const openQuestionFormModal = document.querySelector("#open-question-form-modal")
const closePhotoFormModal = document.querySelector("#close-photo-form-modal")
const closeReviewFormModal = document.querySelector("#close-review-form-modal")
const closeQuestionFormModal = document.querySelector("#close-question-form-modal")
if (openPhotoFormModal != null) {
  openPhotoFormModal.addEventListener("click", function() {
    let photoModal = document.querySelector("#photo-form-modal")
    const photoModalInstance = M.Modal.getInstance(photoModal);
    photoModalInstance.open();
  })
  openReviewFormModal.addEventListener("click", function() {
    let reviewModal = document.querySelector("#review-form-modal")
    const reviewModalInstance = M.Modal.getInstance(reviewModal);
    reviewModalInstance.open();
  })
  openQuestionFormModal.addEventListener("click", function() {
    let questionModal = document.querySelector("#question-form-modal")
    const questionModalInstance = M.Modal.getInstance(questionModal);
    questionModalInstance.open();
  })
  closeReviewFormModal.addEventListener("click", function() {
    let reviewModal = document.querySelector("#review-form-modal")
    const reviewModalInstance = M.Modal.getInstance(reviewModal);
    reviewModalInstance.close();
  })
  closePhotoFormModal.addEventListener("click", function() {
    let photoModal = document.querySelector("#photo-form-modal")
    const photoModalInstance = M.Modal.getInstance(photoModal);
    photoModalInstance.close();
  })
  closeQuestionFormModal.addEventListener("click", function() {
    let questionModal = document.querySelector("#question-form-modal")
    const questionModalInstance = M.Modal.getInstance(questionModal);
    questionModalInstance.close();
  })
}


const openSignInModal = document.querySelectorAll(".open-signin-modal-form")
const closeSignInModal = document.querySelector("#close-signin-form-modal")
openSignInModal.forEach((e)=>{
  e.addEventListener("click", function() {
    let signinModalForm = document.querySelector("#signin-modal-form")
    const signinModalInstance = M.Modal.getInstance(signinModalForm);
    signinModalInstance.open();
  })
})

closeSignInModal.addEventListener("click", function(){
  let signinModalForm = document.querySelector("#signin-modal-form")
  const signinModalInstance = M.Modal.getInstance(signinModalForm);
  signinModalInstance.close();

})


const openSignUpModal = document.querySelectorAll(".open-signup-modal-form")
const closeSignUpModal = document.querySelector("#close-signup-form-modal")
openSignUpModal.forEach((e) => {
  e.addEventListener("click", function () {
    let signupModalForm = document.querySelector("#signup-modal-form")
    const signupModalInstance = M.Modal.getInstance(signupModalForm);
    signupModalInstance.open();
  })
})

closeSignUpModal.addEventListener("click", function () {
  let signupModalForm = document.querySelector("#signup-modal-form")
  const signupModalInstance = M.Modal.getInstance(signupModalForm);
  signupModalInstance.close();

})

});

