  import { h, Component, render } from './preact.js?n=1163';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1163!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  