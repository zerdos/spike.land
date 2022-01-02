  import { h, Component, render } from './preact.js?n=6132';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6132!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  