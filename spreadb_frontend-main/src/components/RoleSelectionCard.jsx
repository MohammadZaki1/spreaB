import { Building2, User } from "lucide-react";
import { cn } from "../lib/utils"

export const RoleSelectionCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
}) => {
  const Icon = icon === "brand" ? Building2 : User;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full max-w-[280px] p-6 rounded-2xl border-2 transition-all duration-200 text-left",
        "hover:border-red/40 hover:shadow-sm",
        selected
          ? "border-purple-600 bg-purple/5"
          : "border-border bg-card"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-muted">
          <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected
              ? "border-purple-600 bg-purple-800"
              : "border-border bg-gray-400"
          )}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-purple-100" />
          )}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground leading-snug">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
};