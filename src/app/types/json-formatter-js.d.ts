/**
 * Interfaces for the JSONFormatter class.
 */
declare namespace JSONFormatter {
  /**
   * Configuration for a JSONFormatter instance.
   */
  interface Configuration {
    /**
     * Display previews of data on mouse hover.
     */
    hoverPreviewEnabled?: boolean;
    /**
     * Number of array items to show on hover preview.
     */
    hoverPreviewArrayCount?: number;
    /**
     * Number of object fields to show on hover preview.
     */
    hoverPreviewFieldCount?: number;
    /**
     * Whether to animate the open action.
     */
    animateOpen?: boolean;
    /**
     * Whether to animate the close action.
     */
    animateClose?: boolean;
    /**
     * Style theme to use.
     */
    theme?: string;
  }
}

/**
 * Displays json data in a collapsible object view.
 */
declare class JSONFormatter {
  constructor(json: any, open?: number, config?: JSONFormatter.Configuration);

  toggleOpen(): void;
  getInlinePreview(): void;
  render(): HTMLDivElement;
  appendChildren(animated?: boolean): void;
  removeChildren(animated?: boolean): void;
}

declare module 'json-formatter-js' {
  export = JSONFormatter;
}
