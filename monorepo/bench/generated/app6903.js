  import { h, Component, render } from './preact.js?n=6903';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6903!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  