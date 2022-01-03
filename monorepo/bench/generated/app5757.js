  import { h, Component, render } from './preact.js?n=5757';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5757!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  