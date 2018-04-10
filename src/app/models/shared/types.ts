export type Vertical = 'Top' | 'Bottom';
export type Horizontal = 'Right' | 'Left';
export type Axis = 'Vertical' | 'Horizontal';
export type Positioning = Vertical | Horizontal;
export type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;
