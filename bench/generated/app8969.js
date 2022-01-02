  import { h, Component, render } from './preact.js?n=8969';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8969!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  