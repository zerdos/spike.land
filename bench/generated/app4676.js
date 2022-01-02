  import { h, Component, render } from './preact.js?n=4676';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4676!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  