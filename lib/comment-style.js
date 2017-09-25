'use babel';

import CommentStyleView from './comment-style-view';
import { CompositeDisposable } from 'atom';

export default {

  commentStyleView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.commentStyleView = new CommentStyleView(state.commentStyleViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.commentStyleView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'comment-style:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.commentStyleView.destroy();
  },

  serialize() {
    return {
      commentStyleViewState: this.commentStyleView.serialize()
    };
  },

  toggle() {
    console.log('CommentStyle was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
