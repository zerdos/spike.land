  import { h, Component, render } from './preact.js?n=9348';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9348!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  