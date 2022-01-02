  import { h, Component, render } from './preact.js?n=5216';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5216!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  