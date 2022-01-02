  import { h, Component, render } from 'lib/preact.js?n=1258';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1258!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  