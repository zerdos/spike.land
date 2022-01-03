  import { h, Component, render } from './preact.js?n=7749';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7749!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  