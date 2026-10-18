import React from 'react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="탐색 경로" className="py-3 text-xs text-[#737780]">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#101B2A] transition-colors"
          >
            홈
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.path}>
              <li aria-hidden="true" className="text-stone-300">
                /
              </li>
              <li>
                {isLast ? (
                  <span className="text-[#101B2A] font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="hover:text-[#101B2A] transition-colors"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
