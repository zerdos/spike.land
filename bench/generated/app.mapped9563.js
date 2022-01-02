  import { h, Component, render } from 'lib/preact.js?n=9563';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9563!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  