  import { h, Component, render } from './preact.js?n=6734';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6734!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  