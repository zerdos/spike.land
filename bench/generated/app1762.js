  import { h, Component, render } from './preact.js?n=1762';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1762!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  