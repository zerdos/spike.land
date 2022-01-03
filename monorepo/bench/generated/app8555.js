  import { h, Component, render } from './preact.js?n=8555';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8555!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  