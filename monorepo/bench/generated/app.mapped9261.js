  import { h, Component, render } from 'lib/preact.js?n=9261';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9261!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  