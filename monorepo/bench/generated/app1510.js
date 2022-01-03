  import { h, Component, render } from './preact.js?n=1510';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1510!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  