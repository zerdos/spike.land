  import { h, Component, render } from './preact.js?n=8718';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8718!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  