  import { h, Component, render } from 'lib/preact.js?n=3684';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3684!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  