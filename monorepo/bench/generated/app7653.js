  import { h, Component, render } from './preact.js?n=7653';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7653!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  