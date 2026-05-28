"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CitationModalProps {
  bibtex: string;
  title: string;
}

export function CitationModal({ bibtex, title }: CitationModalProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          BibTeX
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>BibTeX — {title}</DialogTitle>
        </DialogHeader>
        <pre className="overflow-x-auto rounded-md bg-[var(--code-bg)] p-4 text-xs">
          <code>{bibtex}</code>
        </pre>
        <Button onClick={handleCopy} size="sm" className="w-fit">
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy to clipboard
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
