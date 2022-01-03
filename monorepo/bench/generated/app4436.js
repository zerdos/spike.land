  import { h, Component, render } from './preact.js?n=4436';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4436!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  