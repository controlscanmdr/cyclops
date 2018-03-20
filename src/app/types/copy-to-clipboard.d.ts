declare namespace CopyToClipboard {
  interface CopyToClipboardOptions {
    debug?: boolean;
    message?: string;
  }

  interface CopyToClipboardFunction {
    (text: string, options?: CopyToClipboardOptions): void;
  }
}

declare let copyToClipboard: CopyToClipboard.CopyToClipboardFunction;

declare module 'copy-to-clipboard' {
  export = copyToClipboard;
}
