  import { h, Component, render } from './preact.js?n=7328';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7328!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  