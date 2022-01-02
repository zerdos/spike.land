  import { h, Component, render } from './preact.js?n=7673';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7673!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  