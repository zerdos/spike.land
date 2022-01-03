  import { h, Component, render } from 'lib/preact.js?n=4885';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4885!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  