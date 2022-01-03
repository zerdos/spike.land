  import { h, Component, render } from 'lib/preact.js?n=1652';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1652!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  