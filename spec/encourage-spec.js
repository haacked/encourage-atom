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
    activationPromise = atom.packages.activatePackage('encourage');
  });

  describe('when a file is saved', () => {
    it('hides and shows the modal panel', () => {
      // The panel exists, but should not be visible.
      expect(workspaceElement.querySelector('.encourage')).toExist();
      expect(workspaceElement.querySelector('.encourage').style.display).toBe('');

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'encourage:encourage');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.encourage')).toExist();

        let encourageAtomElement = workspaceElement.querySelector('.encourage');
        expect(encourageAtomElement).toExist();

        let encourageAtomPanel = atom.workspace.panelForItem(encourageAtomElement);
        expect(encourageAtomPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'encourage:encourage');
        expect(encourageAtomPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.encourage')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'encourage:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let encourageAtomElement = workspaceElement.querySelector('.encourage');
        expect(encourageAtomElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'encourage:toggle');
        expect(encourageAtomElement).not.toBeVisible();
      });
    });
  });
});
