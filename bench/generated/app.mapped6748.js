  import { h, Component, render } from 'lib/preact.js?n=6748';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6748!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  