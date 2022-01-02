  import { h, Component, render } from './preact.js?n=8015';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8015!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  