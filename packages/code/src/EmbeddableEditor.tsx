import React, { useState, useEffect } from 'react';
import { AlertCircle, Maximize, QrCode, ExternalLink, Download, Sun, Moon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Resizable } from 're-resizable';

const EmbeddableEditor = () => {
  const [code, setCode] = useState('// Your code here');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Simulating code execution and error checking
    try {
      const result = eval(code); // Note: eval is used for demonstration. In a real app, use a safer method.
      setOutput(String(result));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [code]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const generateQRCode = () => {
    // Implement QR code generation here
    console.log('Generating QR Code');
  };

  const openInNewWindow = () => {
    const newWindow = window.open('', '_blank')!;
    newWindow.document.write(`
      <html>
        <body>
          <div id="root"></div>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `);
  };

  const downloadApp = () => {
    const element = document.createElement('a');
    const file = new Blob([`
      <html>
        <body>
          <div id="root"></div>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'app.html';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={`h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <div className="w-1/2 h-full bg-gray-100 dark:bg-gray-800 p-4">
        <div
         
       
        >MONACOMONACO</div>
      </div>
      <div className="w-1/2 h-full flex flex-col">
        <div className="flex justify-end p-2 bg-gray-200 dark:bg-gray-700">
          <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="ghost" size="icon">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button onClick={toggleFullScreen} variant="ghost" size="icon">
            <Maximize className="h-4 w-4" />
          </Button>
          <Button onClick={generateQRCode} variant="ghost" size="icon">
            <QrCode className="h-4 w-4" />
          </Button>
          <Button onClick={openInNewWindow} variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button onClick={downloadApp} variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <Resizable
          defaultSize={{ width: '100%', height: '50%' }}
          minHeight="20%"
          maxHeight="80%"
          enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
          <div className="bg-white dark:bg-gray-900 p-4 h-full overflow-auto">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Output</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">{output}</pre>
          </div>
        </Resizable>
        <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmbeddableEditor;
