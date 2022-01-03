  import { h, Component, render } from './preact.js?n=5504';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5504!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  