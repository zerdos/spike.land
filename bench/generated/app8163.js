  import { h, Component, render } from './preact.js?n=8163';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8163!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  