  import { h, Component, render } from 'lib/preact.js?n=5980';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5980!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  