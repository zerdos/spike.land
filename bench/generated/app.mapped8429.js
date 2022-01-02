  import { h, Component, render } from 'lib/preact.js?n=8429';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8429!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  