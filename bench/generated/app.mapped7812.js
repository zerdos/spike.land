  import { h, Component, render } from 'lib/preact.js?n=7812';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7812!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  