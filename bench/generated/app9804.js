  import { h, Component, render } from './preact.js?n=9804';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9804!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  