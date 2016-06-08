'use babel';

import EncourageAtomView from './encourage-view';
import { CompositeDisposable } from 'atom';

export default {

  encourageAtomView: null,
  modalPanel: null,
  subscriptions: null,
  encouragements: [
    'Nice Job! 🎇',
    'Way to go! ✨',
    'Wow, nice change! 💗',
    'So good! 💖',
    'Bravo! 👏',
    'You rock! 🚀',
    'Well done! 🎉',
    'I see what you did there! 🙏',
    'Genius work! 🍩',
    'Thumbs up! 👍',
    'Coding win! 🍸',
    'FTW! ⚡️',
    'Yep! 🙆',
    'Nnnnnnnailed it! ✌',
    'You\'re good enough! 😎',
    'You\'re smart enough! 💫',
    'People like you! 💞',
    'Keep going! 👍',
    'Be detached!  🙏',
    'One small step at a time! 👏',
    'Enjoy what you do! ✌',
    'Simple is best. Good job!  🙏'
  ],

  activate(state) {
    this.encourageAtomView = new EncourageAtomView(state.encourageAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.encourageAtomView.getElement(),
      visible: false,
      className: 'encourage'
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register event to watch save and show the encouragement.
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        const savedSubscription = editor.onDidSave(event => this.encourage());
        this.subscriptions.add(savedSubscription);
        this.subscriptions.add(editor.onDidDestroy(() => savedSubscription.dispose()));
      }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.encourageAtomView.destroy();
  },

  serialize() {
    return {
      encourageAtomViewState: this.encourageAtomView.serialize()
    };
  },

  getRandomEncouragement() {
    return this.encouragements[Math.floor(Math.random() * this.encouragements.length)]
  },

  encourage() {
    console.log('EncourageAtom was invoked due to a document save!');
    this.encourageAtomView.setMessage(this.getRandomEncouragement());
    this.modalPanel.hide(); // Hide existing one, if any.
    setTimeout(() => {
      this.encourageAtomView.fadeOut();
      setTimeout(() => this.modalPanel.hide(), 1000);
    }, 1000);
    this.modalPanel.show();
  }
};
