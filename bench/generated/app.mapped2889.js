  import { h, Component, render } from 'lib/preact.js?n=2889';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2889!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  