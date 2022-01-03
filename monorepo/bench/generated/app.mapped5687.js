  import { h, Component, render } from 'lib/preact.js?n=5687';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5687!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  