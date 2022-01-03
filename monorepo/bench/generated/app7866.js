  import { h, Component, render } from './preact.js?n=7866';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7866!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  