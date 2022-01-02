  import { h, Component, render } from 'lib/preact.js?n=9209';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9209!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  