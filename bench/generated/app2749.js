  import { h, Component, render } from './preact.js?n=2749';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2749!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  