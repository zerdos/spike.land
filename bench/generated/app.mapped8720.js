  import { h, Component, render } from 'lib/preact.js?n=8720';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8720!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  