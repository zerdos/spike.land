  import { h, Component, render } from './preact.js?n=3598';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3598!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  