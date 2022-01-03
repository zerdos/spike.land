  import { h, Component, render } from 'lib/preact.js?n=7503';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7503!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  