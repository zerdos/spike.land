  import { h, Component, render } from './preact.js?n=102';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 102!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  