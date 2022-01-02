  import { h, Component, render } from './preact.js?n=7802';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7802!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  