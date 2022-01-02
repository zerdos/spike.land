  import { h, Component, render } from './preact.js?n=8454';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8454!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  