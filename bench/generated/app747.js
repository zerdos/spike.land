  import { h, Component, render } from './preact.js?n=747';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 747!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  