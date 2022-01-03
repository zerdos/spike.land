  import { h, Component, render } from 'lib/preact.js?n=2337';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2337!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  