  import { h, Component, render } from 'lib/preact.js?n=6839';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6839!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  