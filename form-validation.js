export class FormValidateinator {
  #inputElements = null;
  #buttonElement = null;

  constructor(selectors, form) {
    this.inputSelector = selectors.input;
    this.buttonSelector = selectors.button;
    this.errorMsgSelector = selectors.errorMsg;
    this.inputErrorClass = selectors.inputError;
    this.errorMsgClass = selectors.errorMsgClass;
    this.formElement = form;
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.#inputElements = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
    );
    this.#buttonElement = this.formElement.querySelector(this.buttonSelector);

    this.#inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButton();
      });
    });

    this.#toggleButton();
  }

  #checkInputValidity(element) {
    const errorMsgElement = element.parentElement.querySelector(
      this.errorMsgSelector
    );
    if (element.validity.valid) {
      this.#setInputValid(element, errorMsgElement);
    } else {
      this.#setInputInvalid(element, errorMsgElement);
    }
  }
  #setInputValid(element, errorMsgElement) {
    element.classList.remove(this.inputErrorClass);
    errorMsgElement.classList.remove(this.errorMsgClass);
    errorMsgElement.innerText = "";
  }

  #setInputInvalid(element, errorMsgElement) {
    element.classList.add(this.inputErrorClass);
    errorMsgElement.classList.add(this.errorMsgClass);
    errorMsgElement.innerText = element.validationMessage;
  }

  #toggleButton() {
    if (this.#hasInvalidInputs()) {
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.disabled = false;
    }
  }

  #hasInvalidInputs() {
    return this.#inputElements.some((input) => !input.validity.valid);
  }

  resetForm() {
    this.#inputElements.forEach((input) => {
      input.value = "";
      input.classList.remove(this.inputErrorClass);
    });

    this.formElement
      .querySelectorAll(this.errorMsgSelector)
      .forEach((errorMsgElement) => {
        errorMsgElement.classList.remove(this.errorMsgClass);
        errorMsgElement.innerText = "";
      });
    this.#toggleButton();
  }
}
