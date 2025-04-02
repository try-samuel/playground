"use client";

import { Drawer } from "vaul";
import { useState } from "react";
import UserInfoDrawer from "./UserInfoDrawer";

export default function VaulDrawer() {
  const snapPoints = [0.2, 0.7, 0.9];
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [parentSnap, setParentSnap] = useState(0.2);
  // const { user } = useAuth();

  return (
    <Drawer.Root
      defaultOpen={true}
      snapPoints={snapPoints}
      dismissible={false}
      repositionInputs={false}
      modal={false}
      activeSnapPoint={isChildOpen ? 0.7 : parentSnap} // Force 0.7 when child is open
      onOpenChange={(open) => {
        if (!open) setParentSnap(0.7); // Optional: reset to 0.7 when parent closes
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[96%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="w-full px-2 sm:px-6">
              <Drawer.Title className="font-medium mb-4 text-gray-900 sr-only">
                User Button Drawer that carries information about the user and
                search bar
              </Drawer.Title>
              <UserInfoDrawer
                setIsChildOpen={setIsChildOpen}
                setParentSnap={setParentSnap}
                // user={user}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto"></div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
