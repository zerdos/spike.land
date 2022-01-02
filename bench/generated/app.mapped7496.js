  import { h, Component, render } from 'lib/preact.js?n=7496';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7496!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  