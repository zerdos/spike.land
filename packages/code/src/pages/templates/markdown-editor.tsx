import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, List, ListOrdered, Image, Link } from 'lucide-react';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('# Welcome to Markdown Editor\n\nStart typing your markdown here...');

  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById('markdown-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    let insertion = '';

    switch(syntax) {
      case 'bold':
        insertion = `**${text.substring(start, end) || 'bold text'}**`;
        break;
      case 'italic':
        insertion = `*${text.substring(start, end) || 'italic text'}*`;
        break;
      case 'ul':
        insertion = `\n- List item`;
        break;
      case 'ol':
        insertion = `\n1. List item`;
        break;
      case 'image':
        insertion = `![Alt text](https://example.com/image.jpg)`;
        break;
      case 'link':
        insertion = `[Link text](https://example.com)`;
        break;
      default:
        insertion = '';
    }

    setMarkdownText(before + insertion + after);
    textarea.focus();
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('bold')}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('italic')}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('ul')}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('ol')}>
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('image')}>
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => insertMarkdown('link')}>
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <textarea
                id="markdown-textarea"
                className="w-full h-[calc(100vh-250px)] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="w-full h-[calc(100vh-250px)] p-4 border rounded-md overflow-auto prose prose-sm">
                <ReactMarkdown>{markdownText}</ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkdownEditor;