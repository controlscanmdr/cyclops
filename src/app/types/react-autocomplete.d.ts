declare namespace ReactAutocomplete {
  export interface Props {
    items: any[];
    autoHighlight?: boolean;
    inputProps?: any;
    menuStyle?: any;
    open?: boolean;
    value?: any;
    wrapperProps?: any;
    wrapperStyle?: any;
    renderItem(item: any, isHighlighted?: boolean, styles?: any): JSX.Element;
    getItemValue(item: any): string | number;
    onChange?(event: React.SyntheticEvent<HTMLInputElement>, value: string): void;
    onMenuVisibilityChange?(isOpen: boolean): void;
    onSelect?(value: string, item: any): void;
    renderMenu?(items: any[], value: string, styles: any): JSX.Element;
    shouldItemRender?(item: any, value: string): boolean;
    sortItems?(itemA: any, itemB: any, value: string): any;
  }

  export class Component extends React.Component<ReactAutocomplete.Props, {}> {}
}

declare module 'react-autocomplete' {
  export = ReactAutocomplete.Component;
}
