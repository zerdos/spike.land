  import { h, Component, render } from 'lib/preact.js?n=6027';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6027!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  