  import { h, Component, render } from './preact.js?n=6683';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6683!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  