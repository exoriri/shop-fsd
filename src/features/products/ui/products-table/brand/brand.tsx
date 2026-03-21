interface BrandProps {
  title?: string;
}

export const Brand = ({ title }: BrandProps) => {
  return title ? <h4>{title}</h4> : '—';
};
