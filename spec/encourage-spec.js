'use babel';

import EncourageAtom from '../lib/encourage';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('EncourageAtom', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);

    waitsForPromise(() => {
      return atom.packages.activatePackage('encourage');
    });
  });

  it('defaults to hidden', () => {
    expect(EncourageAtom.modalPanel.isVisible()).toBe(false);
  });

  describe('when a file is saved', () => {
    beforeEach(() => {
      EncourageAtom.encourage();
    });

    it('shows the modal panel', () => {
      expect(EncourageAtom.modalPanel.isVisible()).toBe(true);
    });

    it('hides the panel again after a short delay', () => {
      runs(() => {
        setTimeout(() => {
          expect(EncourageAtom.modalPanel.isVisible()).toBe(false);
        }, 1200);
      })
    })
  });
});
