  import { h, Component, render } from './preact.js?n=7685';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7685!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  