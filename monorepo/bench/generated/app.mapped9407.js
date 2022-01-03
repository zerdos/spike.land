  import { h, Component, render } from 'lib/preact.js?n=9407';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9407!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  