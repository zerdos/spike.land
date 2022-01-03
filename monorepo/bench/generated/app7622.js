  import { h, Component, render } from './preact.js?n=7622';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7622!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  