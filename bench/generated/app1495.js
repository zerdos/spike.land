  import { h, Component, render } from './preact.js?n=1495';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1495!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  