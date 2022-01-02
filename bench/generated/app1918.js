  import { h, Component, render } from './preact.js?n=1918';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1918!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  