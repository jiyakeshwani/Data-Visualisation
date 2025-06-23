import React, { useState } from "react";
import { type Variable } from "../../types";

interface Props {
  variable: Variable;
  onSave: (v: Variable) => void;
  onClose: () => void;
}

/**
 * ModifyVariableForm allows editing of a single variable's details.
 * Includes fields for name (read-only), description, category,
 * cost breakdown (monthly), and selection checkbox.
 */
export const ModifyVariableForm: React.FC<Props> = ({
  variable,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<Variable>({ ...variable });

  /**
   * Updates the cost for a specific month and recalculates totalCost.
   * @param month Month to update
   * @param value New cost value
   */
  const handleCostChange = (month: string, value: number) => {
    const updatedCosts = form.cost.map((c) =>
      c.name === month ? { ...c, value } : c
    );
    const updatedTotal = updatedCosts.reduce((sum, c) => sum + c.value, 0);
    setForm({ ...form, cost: updatedCosts, totalCost: updatedTotal });
  };

  return (
    <div className="bg-[#161618] border border-[#525252] mt-7 rounded md:px-6 px-3 py-4">
      <h2 className="text-lg mb-4 text-[var(--green-primary)]">
        Edit Variable
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            readOnly
            value={form.name}
            className="w-full bg-[#242424] border border-[#525252] text-sm mt-2 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#242424] border border-[#525252] text-sm mt-2 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#242424] border border-[#525252] text-sm mt-2 rounded px-3 py-2"
          >
            <option value="Infrastructure">Infrastructure</option>
            <option value="Operational">Operational</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Technology">Technology</option>
            <option value="Policy">Policy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Monthly Costs</label>
          <div className="grid grid-cols-3 gap-2">
            {form.cost.map((c) => (
              <div key={c.name} className="flex gap-2 mt-2 items-center">
                <span className="w-10">{c.name}</span>
                <input
                  type="number"
                  value={c.value}
                  onChange={(e) =>
                    handleCostChange(c.name, Number(e.target.value))
                  }
                  className="w-full bg-[#242424] border border-[#525252] text-sm rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.selected}
            className="w-4 h-4 accent-[var(--green-secondary)]"
            onChange={(e) => setForm({ ...form, selected: e.target.checked })}
          />
          <label>Selected</label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#242424] text-white border border-[#333] rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 bg-[#23291E] text-[#C9FF3B] border border-[#577113] rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
