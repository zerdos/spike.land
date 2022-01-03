  import { h, Component, render } from './preact.js?n=3320';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3320!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  