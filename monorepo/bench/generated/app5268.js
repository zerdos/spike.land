  import { h, Component, render } from './preact.js?n=5268';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5268!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  