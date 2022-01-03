  import { h, Component, render } from 'lib/preact.js?n=8863';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8863!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  