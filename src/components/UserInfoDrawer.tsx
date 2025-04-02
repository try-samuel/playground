import { Drawer } from "vaul";

const UserInfoDrawer = ({
  setIsChildOpen,
  setParentSnap,
}: // user,
{
  setIsChildOpen: (open: boolean) => void;
  setParentSnap: (snap: number) => void;
}) => {
  return (
    <Drawer.NestedRoot
      snapPoints={[0.7]}
      onOpenChange={(open) => {
        setIsChildOpen(open);
        if (open) setParentSnap(0.7);
      }}
    >
      <div className="w-full flex items-center gap-2">
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-xl py-3 px-4 bg-gray-50 ring-0 outline-none"
        />
        <Drawer.Trigger onClick={() => setParentSnap(0.7)}>
          {/* <UserButton
            imageUrl={user?.image || ""}
            fallbackText={`${user?.firstName.charAt(
              0
            )}. ${user?.lastName.charAt(0)}`}
          /> */}
          <p>trigger nested</p>
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] lg:h-[327px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="w-full flex items-center gap-2">
              <Drawer.Title asChild>
                {/* <div className="w-fit flex items-start justify-between">
                  <img
                    src={user?.image}
                    alt={"pfp"}
                    className="w-10 h-10 rounded-full"
                  />
                </div> */}
              </Drawer.Title>
              <Drawer.Description asChild>
                <div className="w-full flex items-start justify-between">
                  <div className="flex flex-col">
                    <p className="text-gray-900 text-sm">
                      {/* {user?.firstName} {user?.lastName} */}
                    </p>
                    <div className="text-gray-900 text-xs">
                      {/* {user?.email} */}
                    </div>
                  </div>
                  <Drawer.Close asChild>
                    <div
                      className="cursor-pointer rounded-full p-1 bg-gray-200"
                      onClick={() => setIsChildOpen(false)}
                    >
                      {/* <X size={24} color="gray" /> */}
                    </div>
                  </Drawer.Close>
                </div>
              </Drawer.Description>
            </div>
          </div>
          <div className="p-4 border-t bg-gray-200 h-[200px]"></div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
};

export default UserInfoDrawer;
