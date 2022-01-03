  import { h, Component, render } from './preact.js?n=519';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 519!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  