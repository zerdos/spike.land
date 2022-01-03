  import { h, Component, render } from './preact.js?n=3022';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3022!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  