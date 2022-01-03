  import { h, Component, render } from 'lib/preact.js?n=5735';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5735!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  