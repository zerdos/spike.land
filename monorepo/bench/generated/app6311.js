  import { h, Component, render } from './preact.js?n=6311';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6311!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  