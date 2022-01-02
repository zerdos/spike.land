  import { h, Component, render } from './preact.js?n=7211';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7211!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  