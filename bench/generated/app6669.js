  import { h, Component, render } from './preact.js?n=6669';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6669!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  