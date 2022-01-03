  import { h, Component, render } from './preact.js?n=2686';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2686!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  