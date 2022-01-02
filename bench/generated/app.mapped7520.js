  import { h, Component, render } from 'lib/preact.js?n=7520';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7520!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  