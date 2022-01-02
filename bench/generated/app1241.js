  import { h, Component, render } from './preact.js?n=1241';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1241!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  