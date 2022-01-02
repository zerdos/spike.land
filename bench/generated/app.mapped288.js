  import { h, Component, render } from 'lib/preact.js?n=288';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 288!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  