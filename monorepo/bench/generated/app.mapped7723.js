  import { h, Component, render } from 'lib/preact.js?n=7723';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7723!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  