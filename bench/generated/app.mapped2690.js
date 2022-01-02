  import { h, Component, render } from 'lib/preact.js?n=2690';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2690!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  