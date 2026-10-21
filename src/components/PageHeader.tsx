import { ArrowUpRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
}

export default function PageHeader({
  eyebrow = "CAMPUS OS",
  title,
  description,
  action,
  onAction,
}: Props) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {action && (
        <button className="secondary-button" onClick={onAction}>
          {action}
          <ArrowUpRight size={16} />
        </button>
      )}
    </div>
  );
}