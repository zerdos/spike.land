  import { h, Component, render } from 'lib/preact.js?n=9312';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9312!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  