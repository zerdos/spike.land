  import { h, Component, render } from 'lib/preact.js?n=2362';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2362!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  