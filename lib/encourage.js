'use babel';

import EncourageAtomView from './encourage-view';
import { CompositeDisposable } from 'atom';
import packageConfig from './config-schema.json';

export default {

  encourageAtomView: null,
  modalPanel: null,
  config: packageConfig,
  subscriptions: null,
  encouragements: [], // Initial state can be drawn from config

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

    this.subscriptions.add(this.subscribeToConfigChanges());
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

  subscribeToConfigChanges() {
    const subscriptions = new CompositeDisposable();

    const encouragementListObserver = atom.config.observe(
      'encourage.encouragementList',
      (value) => {
        console.log('EncourageAtom detected a config change!');
        this.encouragements = value;
      });
    subscriptions.add(encouragementListObserver);

    return subscriptions;
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
