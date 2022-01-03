  import { h, Component, render } from './preact.js?n=1345';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1345!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  