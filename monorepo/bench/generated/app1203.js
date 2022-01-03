  import { h, Component, render } from './preact.js?n=1203';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1203!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  