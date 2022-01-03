  import { h, Component, render } from 'lib/preact.js?n=8318';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8318!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  