  import { h, Component, render } from './preact.js?n=1598';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1598!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  