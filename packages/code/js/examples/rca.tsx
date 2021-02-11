import { Global } from '@emotion/react';
import { motion } from 'framer-motion';

function App() {
  const Logo = () => (
    <div css="font-size: calc(10px + 20vmin)">
      ⚛️
    </div>
  );

  return (
    <AppHeader>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          loop: Infinity,
        }}>
        <Logo />
      </motion.div>
      <p>
        Hey! Try to modify the <code>code</code>.
      </p>

      <a
        css="color: #61dafb;"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        Learn ❤️ React ❤️
      </a>
    </AppHeader>
  );
}

export default () => (
  <>
    <Global
      styles={`
        body
          margin: 0;
          overflow: hidden;
          font-family: Roboto;
        }
        code {
          font-family: Courier New;
        }
    `}
    />
    <App />
  </>
);

const AppHeader: React.FC = ({ children }) => (
  <header
    css={`
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
      text-align: center;
      overflow: hidden;
    `}>
    {children}
  </header>
);
