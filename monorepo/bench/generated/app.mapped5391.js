  import { h, Component, render } from 'lib/preact.js?n=5391';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5391!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  