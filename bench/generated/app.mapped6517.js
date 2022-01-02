  import { h, Component, render } from 'lib/preact.js?n=6517';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6517!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  