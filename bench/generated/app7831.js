  import { h, Component, render } from './preact.js?n=7831';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7831!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  