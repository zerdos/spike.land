  import { h, Component, render } from './preact.js?n=8699';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8699!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  