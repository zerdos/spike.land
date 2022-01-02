  import { h, Component, render } from 'lib/preact.js?n=9154';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9154!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  