import { ReactNode } from "react";

interface PercentagemItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentagemItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        <div>
          {/* Value */}
          <p className="text-sm font-bold">R$ {value}%</p>
        </div>
      </div>
    </div>
  );
};

export default PercentageItem;
