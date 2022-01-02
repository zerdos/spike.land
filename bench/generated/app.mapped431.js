  import { h, Component, render } from 'lib/preact.js?n=431';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 431!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  