  import { h, Component, render } from './preact.js?n=2794';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2794!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  