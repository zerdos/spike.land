  import { h, Component, render } from './preact.js?n=468';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 468!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  