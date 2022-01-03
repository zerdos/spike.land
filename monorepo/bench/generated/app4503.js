  import { h, Component, render } from './preact.js?n=4503';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4503!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  