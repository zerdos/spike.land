  import { h, Component, render } from './preact.js?n=7106';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7106!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  