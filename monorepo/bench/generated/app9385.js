  import { h, Component, render } from './preact.js?n=9385';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9385!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  