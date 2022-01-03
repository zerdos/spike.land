  import { h, Component, render } from 'lib/preact.js?n=4991';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4991!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  