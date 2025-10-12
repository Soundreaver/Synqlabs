"use client";

import { ReactNode } from "react";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Simple markdown-like parsing for now
  // In production, you'd use a library like react-markdown or similar
  const formatContent = (text: string): ReactNode[] => {
    const lines = text.split("\n");
    const elements: ReactNode[] = [];
    let key = 0;

    lines.forEach((line, index) => {
      // Headings
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="text-2xl font-bold mt-8 mb-4 text-white">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="text-3xl font-bold mt-12 mb-6 text-white">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={key++} className="text-4xl font-bold mt-12 mb-6 text-white">
            {line.substring(2)}
          </h1>
        );
      }
      // Code blocks (simplified)
      else if (line.startsWith("```")) {
        // Skip code fence markers for now
        return;
      }
      // Blockquotes
      else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={key++}
            className="border-l-4 border-[#152514] pl-4 py-2 my-4 italic text-gray-300"
          >
            {line.substring(2)}
          </blockquote>
        );
      }
      // List items
      else if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li key={key++} className="ml-6 mb-2 text-gray-300">
            {line.substring(2)}
          </li>
        );
      }
      // Paragraphs
      else if (line.trim() !== "") {
        elements.push(
          <p key={key++} className="mb-4 text-gray-300 leading-relaxed">
            {line}
          </p>
        );
      }
      // Empty lines
      else {
        elements.push(<div key={key++} className="h-4" />);
      }
    });

    return elements;
  };

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <div className="blog-content">{formatContent(content)}</div>
    </article>
  );
}
