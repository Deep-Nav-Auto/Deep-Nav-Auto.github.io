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
        <button className="nm-btn-xs text-center min-w-[70px]">
          Cite
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto bg-[#080808] border border-[rgba(255,255,255,0.06)] text-white">
        <DialogHeader>
          <DialogTitle className="font-syne font-semibold text-lg text-white">BibTeX — {title}</DialogTitle>
        </DialogHeader>
        <pre className="overflow-x-auto rounded-md bg-white/5 p-4 text-xs font-mono text-white/80">
          <code>{bibtex}</code>
        </pre>
        <button onClick={handleCopy} className="nm-btn-primary mt-4 flex items-center justify-center gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy to clipboard
            </>
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
}
