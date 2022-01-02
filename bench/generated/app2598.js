  import { h, Component, render } from './preact.js?n=2598';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2598!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  