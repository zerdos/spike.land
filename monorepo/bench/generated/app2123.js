  import { h, Component, render } from './preact.js?n=2123';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2123!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  