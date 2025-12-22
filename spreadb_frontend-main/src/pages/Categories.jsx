import React from "react";
import {
  CodeBracketIcon,
  PaintBrushIcon,
  CpuChipIcon,
  UserGroupIcon,          // Replaced HandshakeIcon
  PencilIcon,
  UserIcon,
  BanknotesIcon,
  ScaleIcon,
  UsersIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

const categories = [
  { title: "Development & IT", icon: <CodeBracketIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Design & Creative", icon: <PaintBrushIcon className="h-10 w-10 text-purple-500" /> },
  { title: "AI Services", icon: <CpuChipIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Sales & Marketing", icon: <UserGroupIcon className="h-10 w-10 text-purple-500" /> },  // Changed here
  { title: "Writing & Translation", icon: <PencilIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Admin & Support", icon: <UserIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Finance & Accounting", icon: <BanknotesIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Legal", icon: <ScaleIcon className="h-10 w-10 text-purple-500" /> },
  { title: "HR & Training", icon: <UsersIcon className="h-10 w-10 text-purple-500" /> },
  { title: "Engineering & Architecture", icon: <WrenchScrewdriverIcon className="h-10 w-10 text-purple-500" /> }
];

const CategoriesGrid = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-10">Explore millions of pros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="border rounded-xl p-8 shadow-sm hover:shadow-md transition bg-white flex flex-col items-start border-purple-600"
          >
            {cat.icon}
            <p className="mt-4 text-xl font-semibold">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
