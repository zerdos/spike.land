  import { h, Component, render } from './preact.js?n=4931';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4931!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  