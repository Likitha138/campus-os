import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: ReactNode;
}

function PageHeader({
  title,
  subtitle,
  description,
  action,
}: PageHeaderProps) {
  const supportingText = subtitle || description;

  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>

        {supportingText && (
          <p>{supportingText}</p>
        )}
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}

export default PageHeader;