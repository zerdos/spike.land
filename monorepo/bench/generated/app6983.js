  import { h, Component, render } from './preact.js?n=6983';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6983!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  