  import { h, Component, render } from './preact.js?n=387';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 387!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  