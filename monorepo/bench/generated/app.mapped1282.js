  import { h, Component, render } from 'lib/preact.js?n=1282';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1282!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  