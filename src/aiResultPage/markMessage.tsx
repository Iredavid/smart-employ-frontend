import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h3 className="text-base font-bold text-slate-900 mt-3 mb-1">{children}</h3>
        ),
        h2: ({ children }) => (
          <h3 className="text-base font-bold text-slate-900 mt-3 mb-1">{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 className="text-sm font-semibold text-slate-900 mt-3 mb-1">{children}</h4>
        ),
        p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline break-words"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-3 border-slate-200" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-200 pl-3 my-2 text-slate-600">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-xs">
            {children}
          </code>
        ),
        // Tables scroll sideways instead of breaking the bubble
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 rounded-xl border border-slate-200">
            <table className="min-w-full text-xs">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
        th: ({ children }) => (
          <th className="px-3 py-2 text-left font-semibold text-slate-700 border-b border-slate-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 border-b border-slate-100 align-top">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}