  import { h, Component, render } from 'lib/preact.js?n=1431';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1431!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  