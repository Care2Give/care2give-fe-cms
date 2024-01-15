import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { CampaignInput } from "@/pages/donations/export-data";

interface MultiSelectProps {
  data: CampaignInput[];
  selected: CampaignInput[];
  setSelected: (campaigns: CampaignInput[]) => void;
}

export default function MultiSelect({
  data,
  selected,
  setSelected,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (campaign: CampaignInput) => {
    const newInput = selected.filter((s) => s.value !== campaign.value);
    setSelected(newInput);
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = data.filter(
    (c) => !selected.some((s) => s.label === c.label && s.value === c.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-white">
        <div className="flex gap-1 flex-wrap">
          {selected.map((campaign, i) => {
            return (
              <Badge
                key={`${campaign.value}_${i}`}
                className="bg-[#FFEFE0] text-black hover:bg-[#FFEFE0]"
              >
                {campaign.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(campaign);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(campaign)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select campaigns..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((campaign, i) => {
                return (
                  <CommandItem
                    key={`${campaign.value}_${i}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected([...selected, campaign]);
                    }}
                    className="cursor-pointer"
                  >
                    {campaign.label}
                    <span className="hidden">{campaign.value}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
