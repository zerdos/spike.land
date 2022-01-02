  import { h, Component, render } from './preact.js?n=7867';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7867!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  