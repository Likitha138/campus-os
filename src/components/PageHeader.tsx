// ============================================================
// src/components/PageHeader.tsx
// ============================================================

import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header-main">
        {icon && (
          <div className="page-header-icon">
            {icon}
          </div>
        )}

        <div>
          <span className="page-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      {action && (
        <div className="page-header-action">
          {action}
        </div>
      )}
    </section>
  );
}

export default PageHeader;