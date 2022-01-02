  import { h, Component, render } from './preact.js?n=6621';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6621!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  