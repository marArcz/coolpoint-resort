export type Props = {
    name: string;
    label: string;
    min?: number;
    value?: number;
    handleChange?: (value: number) => void;
};
