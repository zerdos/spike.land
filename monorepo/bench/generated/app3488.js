  import { h, Component, render } from './preact.js?n=3488';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3488!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  