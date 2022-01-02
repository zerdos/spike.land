  import { h, Component, render } from './preact.js?n=3994';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3994!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  