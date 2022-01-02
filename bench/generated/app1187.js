  import { h, Component, render } from './preact.js?n=1187';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1187!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  