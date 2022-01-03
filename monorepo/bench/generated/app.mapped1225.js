  import { h, Component, render } from 'lib/preact.js?n=1225';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1225!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  