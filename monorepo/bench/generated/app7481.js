  import { h, Component, render } from './preact.js?n=7481';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7481!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  