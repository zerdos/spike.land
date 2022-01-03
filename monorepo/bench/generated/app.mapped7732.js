  import { h, Component, render } from 'lib/preact.js?n=7732';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7732!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  