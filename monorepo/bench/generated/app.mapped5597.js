  import { h, Component, render } from 'lib/preact.js?n=5597';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5597!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  