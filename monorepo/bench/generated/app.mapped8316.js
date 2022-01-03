  import { h, Component, render } from 'lib/preact.js?n=8316';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8316!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  