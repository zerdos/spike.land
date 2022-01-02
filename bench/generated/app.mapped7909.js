  import { h, Component, render } from 'lib/preact.js?n=7909';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7909!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  