  import { h, Component, render } from 'lib/preact.js?n=7734';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7734!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  