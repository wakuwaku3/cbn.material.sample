export type Vertical = 'Top' | 'Bottom';
export type Horizontal = 'Right' | 'Left';
export type Axis = 'Vertical' | 'Horizontal';
export type Scroll = 'auto' | 'hidden' | 'scroll';
export type Positioning = Vertical | Horizontal;
export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type TdProps = React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
>;
export type ThProps = React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
>;
export type SortDirection = 'asc' | 'desc';
export type Classes<Style> = Record<keyof Partial<Style>, string>;
