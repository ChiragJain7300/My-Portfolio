import React from "react";

interface TreeNode {
  label: string;
  badge?: string;
  badgeColor?: string;
  detail?: string;
  children?: TreeNode[];
}

interface IndentedTreeProps {
  title?: string;
  nodes: TreeNode[];
  className?: string;
}

export function IndentedTree({ title, nodes, className = "" }: IndentedTreeProps) {
  const renderNode = (node: TreeNode, isLast: boolean, prefix = ""): React.ReactNode => {
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = prefix + (isLast ? "    " : "│   ");

    return (
      <div key={node.label} className="select-text py-1 group">
        <div className="flex items-start gap-2">
          <span className="font-mono text-xs text-[var(--color-overlay1)] select-none shrink-0 pt-0.5">
            {prefix}
            {connector}
          </span>

          <div className="flex flex-wrap items-baseline gap-2 min-w-0">
            <span className="font-sans text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-green)] transition-colors">
              {node.label}
            </span>

            {node.badge && (
              <span
                className="font-mono text-[10px] px-2 py-0.5 border rounded-xs"
                style={{
                  color: node.badgeColor || "var(--color-blue)",
                  borderColor: `color-mix(in srgb, ${node.badgeColor || "var(--color-blue)"} 40%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${node.badgeColor || "var(--color-blue)"} 8%, transparent)`,
                }}
              >
                [{node.badge}]
              </span>
            )}

            {node.detail && (
              <span className="font-sans text-sm text-[var(--color-subtext2)]">
                — {node.detail}
              </span>
            )}
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="relative">
            {node.children.map((child, idx) =>
              renderNode(child, idx === (node.children?.length ?? 1) - 1, childPrefix)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`p-5 bg-[var(--color-surface1)]/20 border border-[var(--color-overlay0)]/40 rounded-md ${className}`}>
      {title && (
        <div className="pb-3 mb-3 border-b border-[var(--color-overlay0)]/30 flex items-center justify-between">
          <span className="font-sans text-sm font-bold text-[var(--color-text)]">
            {title}
          </span>
          <span className="font-mono text-xs text-[var(--color-overlay2)]">
            [Feature Architecture Tree]
          </span>
        </div>
      )}

      <div className="space-y-0.5">
        {nodes.map((node, idx) => renderNode(node, idx === nodes.length - 1))}
      </div>
    </div>
  );
}
