  import { h, Component, render } from './preact.js?n=768';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 768!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  