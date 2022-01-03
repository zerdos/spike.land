  import { h, Component, render } from 'lib/preact.js?n=422';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 422!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  