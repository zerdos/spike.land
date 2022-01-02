  import { h, Component, render } from './preact.js?n=1954';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1954!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  