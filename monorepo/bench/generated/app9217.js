  import { h, Component, render } from './preact.js?n=9217';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9217!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  