  import { h, Component, render } from './preact.js?n=1365';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1365!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  