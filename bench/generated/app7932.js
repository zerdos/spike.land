  import { h, Component, render } from './preact.js?n=7932';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7932!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  