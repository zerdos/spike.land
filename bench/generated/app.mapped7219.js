  import { h, Component, render } from 'lib/preact.js?n=7219';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7219!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  