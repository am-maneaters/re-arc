import { useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import vscDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import vscLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';

import { useTheme } from '../contexts/ThemeProvider';

SyntaxHighlighter.registerLanguage('tsx', tsx);

function formatImports(code: string): string {
  const lines = code.split('\n');

  const newLines: string[] = [];
  let inImportBlock = false;

  for (const line of lines) {
    if (line.startsWith('import ') && !line.endsWith(';')) {
      inImportBlock = true;
      newLines.push(line);
    } else if (inImportBlock) {
      if (line.endsWith(';')) {
        inImportBlock = false;
        // remove the final comma
        newLines[newLines.length - 1] = newLines[newLines.length - 1].slice(
          0,
          -1
        );
      }
      newLines[newLines.length - 1] += ' ' + line.trim();
    } else {
      newLines.push(line);
    }
  }
  return newLines.join('\n');
}

export function CodeDisplayAsync({
  codePromise,
}: {
  codePromise: () => Promise<typeof import('*?raw')>;
}) {
  const [code, setCode] = useState('');

  useEffect(() => {
    codePromise().then((code) => {
      const formatted = formatImports(code.default);
      return setCode(formatted);
    });
  }, [codePromise]);

  return <CodeDisplay code={code} />;
}

export function CodeDisplay({ code }: { code: string }) {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter
      style={theme === 'dark' ? vscDark : vscLight}
      customStyle={{ margin: 0 }}
      codeTagProps={{ style: { fontFamily: 'Fira Code, monospace' } }}
      lineProps={{ style: { fontFamily: 'Fira Code, monospace' } }}
      language="tsx"
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
}
