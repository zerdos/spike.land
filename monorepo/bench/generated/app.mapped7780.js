  import { h, Component, render } from 'lib/preact.js?n=7780';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7780!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  