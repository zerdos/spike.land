  import { h, Component, render } from './preact.js?n=3260';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3260!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  