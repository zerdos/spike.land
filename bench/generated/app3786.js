  import { h, Component, render } from './preact.js?n=3786';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3786!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  