  import { h, Component, render } from 'lib/preact.js?n=8296';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8296!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  