"use client";
import * as React from "react";
import { RxCaretSort as CaretSortIcon, RxCheck as CheckIcon } from "react-icons/rx";
import { cn } from "lib/utils";
import Button from "components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import useMatchMedia from "hooks/useMatchMedia";
import { Drawer, DrawerContent, DrawerTrigger } from "components/ui/drawer";

type option = {
  value: string;
  label: string;
};
interface ComboboxProps {
  disabled?: boolean;
  open: boolean;
  value: string | string[];
  onValueChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  options?: option[];
  optionsHeader?: {
    name: string;
    options: option[];
  }[];
  placeholder?: string;
  notFoundText?: string;
}

export function Combobox(props: ComboboxProps) {
  const {
    open,
    disabled,
    value,
    onOpenChange,
    options,
    optionsHeader,
    placeholder = "Seleccionar",
    notFoundText = "Sin resultados"
  } = props;
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const flatOptions = optionsHeader ? optionsHeader.flatMap((group) => group.options) : options || [];

  const currentValue = value
    ? Array.isArray(value)
      ? flatOptions
          .filter((item) => value.includes(item.value))
          .map((item) => item.label)
          .join(", ")
      : flatOptions.find((item) => item.value === value)?.label
    : "";

  const isDesktop = useMatchMedia("(min-width: 768px)");

  const button = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-[200px] justify-between"
      disabled={disabled}
    >
      <span className="overflow-hidden overflow-ellipsis">{value ? currentValue : placeholder}</span>
      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{button}</PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <StatusList {...props} placeholder={placeholder} notFoundText={notFoundText} currentValue={currentValue} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent className="p-0 pt-2">
        <div className="mt-4 border-t">
          <StatusList {...props} placeholder={placeholder} notFoundText={notFoundText} currentValue={currentValue} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const StatusList: React.FC<ComboboxProps & { currentValue?: string }> = (props) => {
  const { value, onValueChange, onOpenChange, options, optionsHeader, notFoundText } = props;
  return (
    <Command>
      <CommandInput placeholder="Buscar..." className="h-9" />
      <CommandEmpty>{notFoundText}</CommandEmpty>

      <CommandList>
        {optionsHeader?.length ? (
          <>
            {optionsHeader.map((group) => (
              <CommandGroup key={group.name} heading={group.name}>
                {group.options.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      onOpenChange(false);
                    }}
                  >
                    {item.label}
                    <CheckIcon
                      className={cn("ml-auto h-4 w-4", value?.includes(item.value) ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </>
        ) : (
          <CommandGroup>
            {options?.length === 0 && <CommandItem disabled>Lista vacia</CommandItem>}
            {options?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  onOpenChange(false);
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn("ml-auto h-4 w-4", value?.includes(item.value) ? "opacity-100" : "opacity-0")}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default Combobox;
