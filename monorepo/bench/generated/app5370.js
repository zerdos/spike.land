  import { h, Component, render } from './preact.js?n=5370';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5370!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  