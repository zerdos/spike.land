  import { h, Component, render } from './preact.js?n=7728';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7728!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  