"use client";
import { forwardRef } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import ResaleMap from "./ResaleMap";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetContent = forwardRef(({ position = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10" />
    <SheetPrimitive.Content
      ref={ref}
      className={`fixed inset-y-0 ${position}-0 h-full w-[40vw] bg-white shadow-lg z-[100] ${className}`}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const MapDrawer = ({ isOpen, onClose, listings }) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent position="right" className="!p-0">
        <div className="absolute inset-0">
          <ResaleMap listings={listings} onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MapDrawer;
