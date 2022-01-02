  import { h, Component, render } from './preact.js?n=7184';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7184!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  