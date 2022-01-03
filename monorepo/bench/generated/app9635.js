  import { h, Component, render } from './preact.js?n=9635';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9635!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  