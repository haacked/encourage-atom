'use babel';

export default class EncourageAtomView {
  message = null;

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'Be encouraged!'; // This will replaced.
    message.classList.add('message');
    this.element.appendChild(message);
  }

  fadeOut() {
    this.element.parentElement.classList.add('encourage-hidden');
  }

  setMessage(text) {
    this.element.firstChild.textContent = text;
    this.element.parentElement.classList.remove('encourage-hidden');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
