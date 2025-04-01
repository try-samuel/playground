"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { Drawer } from "vaul";

const snapPoints = ["148px", "355px", 1];

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Turva Playground</h1>
      <Drawer.Root>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Default Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
              />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4 text-gray-900">
                  Drawer for React.
                </Drawer.Title>
                <p className="text-gray-600 mb-2">
                  This component can be used as a Dialog replacement on mobile
                  and tablet devices. You can read about why and how it was
                  built{" "}
                  <a
                    target="_blank"
                    className="underline"
                    href="https://emilkowal.ski/ui/building-a-drawer-component"
                  >
                    here
                  </a>
                  .
                </p>
                <p className="text-gray-600 mb-2">
                  This one specifically is the most simplest setup you can have,
                  just a simple drawer with a trigger.
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://github.com/emilkowalski/vaul"
                  target="_blank"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://twitter.com/emilkowalski_"
                  target="_blank"
                >
                  Twitter
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root direction="right">
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Right Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-2 text-zinc-900">
                  It supports all directions.
                </Drawer.Title>
                <Drawer.Description className="text-zinc-600 mb-2">
                  This one specifically is not touching the edge of the screen,
                  but that&apos;s not required for a side drawer.
                </Drawer.Description>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Nested Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 lg:h-fit max-h-[96%] fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4 text-gray-900">
                  Nested Drawers.
                </Drawer.Title>
                <p className="text-gray-600 mb-2">
                  Nesting drawers creates a{" "}
                  <a
                    href="https://sonner.emilkowal.ski/"
                    target="_blank"
                    className="underline"
                  >
                    Sonner-like
                  </a>{" "}
                  stacking effect .
                </p>
                <p className="text-gray-600 mb-2">
                  You can nest as many drawers as you want. All you need to do
                  is add a `Drawer.NestedRoot` component instead of
                  `Drawer.Root`.
                </p>
                <Drawer.NestedRoot>
                  <Drawer.Trigger className="rounded-md mt-4 w-full bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                    Open Second Drawer
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] lg:h-[327px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0">
                      <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                        <div className="max-w-md mx-auto">
                          <Drawer.Title className="font-medium mb-4 text-gray-900">
                            This drawer is nested.
                          </Drawer.Title>
                          <p className="text-gray-600 mb-2">
                            If you pull this drawer down a bit, it&apos;ll scale
                            the drawer underneath it as well.
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
                        <div className="flex gap-6 justify-end max-w-md mx-auto">
                          <a
                            className="text-xs text-gray-600 flex items-center gap-0.25"
                            href="https://github.com/emilkowalski/vaul"
                            target="_blank"
                          >
                            GitHub
                            <svg
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="16"
                              aria-hidden="true"
                              className="w-3 h-3 ml-1"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                              <path d="M15 3h6v6"></path>
                              <path d="M10 14L21 3"></path>
                            </svg>
                          </a>
                          <a
                            className="text-xs text-gray-600 flex items-center gap-0.25"
                            href="https://twitter.com/emilkowalski_"
                            target="_blank"
                          >
                            Twitter
                            <svg
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="16"
                              aria-hidden="true"
                              className="w-3 h-3 ml-1"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                              <path d="M15 3h6v6"></path>
                              <path d="M10 14L21 3"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.NestedRoot>
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://github.com/emilkowalski/vaul"
                  target="_blank"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://twitter.com/emilkowalski_"
                  target="_blank"
                >
                  Twitter
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Scrollable Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="max-w-md mx-auto space-y-4">
                <div
                  aria-hidden
                  className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
                />
                <Drawer.Title className="font-medium mb-4 text-gray-900">
                  Ira Glass on Taste
                </Drawer.Title>
                <p className="text-gray-600">
                  Nobody tells this to people who are beginners, I wish someone
                  told me. All of us who do creative work, we get into it
                  because we have good taste.
                </p>
                <p className="text-gray-600">
                  But there is this gap. For the first couple years you make
                  stuff, it&apos;s just not that good. It&apos;s trying to be
                  good, it has potential, but it&apos;s not. But your taste, the
                  thing that got you into the game, is still killer. And your
                  taste is why your work disappoints you. A lot of people never
                  get past this phase, they quit.{" "}
                </p>
                <p className="text-gray-600">
                  Most people I know who do interesting, creative work went
                  through years of this. We know our work doesn&apos;t have this
                  special thing that we want it to have. We all go through this.
                  And if you are just starting out or you are still in this
                  phase, you gotta know its normal and the most important thing
                  you can do is do a lot of work
                </p>
                <p className="text-gray-600">
                  Put yourself on a deadline so that every week you will finish
                  one story. It is only by going through a volume of work that
                  you will close that gap, and your work will be as good as your
                  ambitions. And I took longer to figure out how to do this than
                  anyone I&apos;ve ever met. It&apos;s gonna take awhile.
                  It&apos;s normal to take awhile. You&apos;ve just gotta fight
                  your way through.
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Controlled Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4 text-gray-900">
                  A controlled drawer.
                </Drawer.Title>
                <p className="text-gray-600 mb-2">
                  This means that the drawer no longer manages its own state.
                  Instead, you can control it programmatically from the outside.
                </p>
                <p className="text-gray-600 mb-2">
                  But you can still let the drawer help you a bit by passing the
                  `onOpenChange` prop. This way, the drawer will change your
                  open state when the user clicks outside of it, or when they
                  press the escape key for example.
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://github.com/emilkowalski/vaul"
                  target="_blank"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://twitter.com/emilkowalski_"
                  target="_blank"
                >
                  Twitter
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer with Snapping
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content
            data-testid="content"
            className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
          >
            <div
              className={clsx(
                "flex flex-col max-w-md mx-auto w-full p-4 pt-5",
                {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                }
              )}
            >
              <div className="flex items-center">
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <Drawer.Title className="text-2xl mt-2 font-medium text-gray-900">
                The Hidden Details
              </Drawer.Title>
              <p className="text-sm mt-1 text-gray-600 mb-6">
                40 videos, 20+ exercises
              </p>
              <p className="text-gray-600">
                The world of user interface design is an intricate landscape
                filled with hidden details and nuance. In this course, you will
                learn something cool. To the untrained eye, a beautifully
                designed UI.
              </p>
              <button className="bg-black text-gray-50 mt-8 rounded-md h-[48px] flex-shrink-0 font-medium">
                Buy for $199
              </button>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 01. The Details
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Layers of UI</span>
                    <span className="text-gray-600">
                      A basic introduction to Layers of Design.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">Typography</span>
                    <span className="text-gray-600">
                      The fundamentals of type.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">UI Animations</span>
                    <span className="text-gray-600">
                      Going through the right easings and durations.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <figure>
                  <blockquote className="font-serif text-gray-900">
                    “I especially loved the hidden details video. That was so
                    useful, learned a lot by just reading it. Can&rsquo;t wait
                    for more course content!”
                  </blockquote>
                  <figcaption>
                    <span className="text-sm text-gray-600 mt-2 block">
                      Yvonne Ray, Frontend Developer
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 02. The Process
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Build</span>
                    <span className="text-gray-600">
                      Create cool components to practice.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">User Insight</span>
                    <span className="text-gray-600">
                      Find out what users think and fine-tune.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">
                      Putting it all together
                    </span>
                    <span className="text-gray-600">
                      Let&apos;s build an app together and apply everything.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
      >
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19]">
          drawer that allows interaction with bg
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content
            data-testid="content"
            className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
          >
            <div
              className={clsx(
                "flex flex-col max-w-md mx-auto w-full p-4 pt-5",
                {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                }
              )}
            >
              <div className="flex items-center">
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-gray-300 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>{" "}
              <Drawer.Title className="text-2xl mt-2 font-medium text-gray-900">
                The Hidden Details
              </Drawer.Title>
              <p className="text-sm mt-1 text-gray-600 mb-6">
                2 modules, 27 hours of video
              </p>
              <p className="text-gray-600">
                The world of user interface design is an intricate landscape
                filled with hidden details and nuance. In this course, you will
                learn something cool. To the untrained eye, a beautifully
                designed UI.
              </p>
              <button className="bg-black text-gray-50 mt-8 rounded-md h-[48px] flex-shrink-0 font-medium">
                Buy for $199
              </button>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 01. The Details
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Layers of UI</span>
                    <span className="text-gray-600">
                      A basic introduction to Layers of Design.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">Typography</span>
                    <span className="text-gray-600">
                      The fundamentals of type.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">UI Animations</span>
                    <span className="text-gray-600">
                      Going through the right easings and durations.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <figure>
                  <blockquote className="font-serif text-gray-900">
                    “I especially loved the hidden details video. That was so
                    useful, learned a lot by just reading it. Can&rsquo;t wait
                    for more course content!”
                  </blockquote>
                  <figcaption>
                    <span className="text-sm text-gray-600 mt-2 block">
                      Yvonne Ray, Frontend Developer
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 02. The Process
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Build</span>
                    <span className="text-gray-600">
                      Create cool components to practice.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">User Insight</span>
                    <span className="text-gray-600">
                      Find out what users think and fine-tune.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">
                      Putting it all together
                    </span>
                    <span className="text-gray-600">
                      Let&apos;s build an app together and apply everything.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        snapToSequentialPoint
      >
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          open sequential snapping drawer
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content
            data-testid="content"
            className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
          >
            <div
              className={clsx(
                "flex flex-col max-w-md mx-auto w-full p-4 pt-5",
                {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                }
              )}
            >
              <div className="flex items-center">
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-gray-300 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <Drawer.Title className="text-2xl mt-2 font-medium text-gray-900">
                The Hidden Details
              </Drawer.Title>
              <p className="text-sm mt-1 text-gray-600 mb-6">
                2 modules, 27 hours of video
              </p>
              <p className="text-gray-600">
                The world of user interface design is an intricate landscape
                filled with hidden details and nuance. In this course, you will
                learn something cool. To the untrained eye, a beautifully
                designed UI.
              </p>
              <button className="bg-black text-gray-50 mt-8 rounded-md h-[48px] flex-shrink-0 font-medium">
                Buy for $199
              </button>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 01. The Details
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Layers of UI</span>
                    <span className="text-gray-600">
                      A basic introduction to Layers of Design.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">Typography</span>
                    <span className="text-gray-600">
                      The fundamentals of type.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">UI Animations</span>
                    <span className="text-gray-600">
                      Going through the right easings and durations.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <figure>
                  <blockquote className="font-serif text-gray-900">
                    “I especially loved the hidden details video. That was so
                    useful, learned a lot by just reading it. Can&rsquo;t wait
                    for more course content!”
                  </blockquote>
                  <figcaption>
                    <span className="text-sm text-gray-600 mt-2 block">
                      Yvonne Ray, Frontend Developer
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 02. The Process
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Build</span>
                    <span className="text-gray-600">
                      Create cool components to practice.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">User Insight</span>
                    <span className="text-gray-600">
                      Find out what users think and fine-tune.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">
                      Putting it all together
                    </span>
                    <span className="text-gray-600">
                      Let&apos;s build an app together and apply everything.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        fadeFromIndex={1}
      >
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer with custom fade index
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal>
          <Drawer.Content
            data-testid="content"
            className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
          >
            <div
              className={clsx(
                "flex flex-col max-w-md mx-auto w-full p-4 pt-5",
                {
                  "overflow-y-auto": snap === 1,
                  "overflow-hidden": snap !== 1,
                }
              )}
            >
              <div className="flex items-center">
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="text-yellow-400 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <Drawer.Title className="text-2xl mt-2 font-medium text-gray-900">
                The Hidden Details
              </Drawer.Title>
              <p className="text-sm mt-1 text-gray-600 mb-6">
                40 videos, 20+ exercises
              </p>
              <p className="text-gray-600">
                The world of user interface design is an intricate landscape
                filled with hidden details and nuance. In this course, you will
                learn something cool. To the untrained eye, a beautifully
                designed UI.
              </p>
              <button className="bg-black text-gray-50 mt-8 rounded-md h-[48px] flex-shrink-0 font-medium">
                Buy for $199
              </button>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 01. The Details
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Layers of UI</span>
                    <span className="text-gray-600">
                      A basic introduction to Layers of Design.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">Typography</span>
                    <span className="text-gray-600">
                      The fundamentals of type.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">UI Animations</span>
                    <span className="text-gray-600">
                      Going through the right easings and durations.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <figure>
                  <blockquote className="font-serif text-gray-900">
                    “I especially loved the hidden details video. That was so
                    useful, learned a lot by just reading it. Can&rsquo;t wait
                    for more course content!”
                  </blockquote>
                  <figcaption>
                    <span className="text-sm text-gray-600 mt-2 block">
                      Yvonne Ray, Frontend Developer
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="mt-12">
                <h2 className="text-xl font-medium text-gray-900">
                  Module 02. The Process
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <span className="block text-gray-900">Build</span>
                    <span className="text-gray-600">
                      Create cool components to practice.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">User Insight</span>
                    <span className="text-gray-600">
                      Find out what users think and fine-tune.
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-900">
                      Putting it all together
                    </span>
                    <span className="text-gray-600">
                      Let&apos;s build an app together and apply everything.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer with input reposition
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
            <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
              <Drawer.Handle />
              <Drawer.Title className="font-medium text-gray-900 mt-8">
                New Project
              </Drawer.Title>
              <Drawer.Description className="leading-6 mt-2 text-gray-600">
                Get started by filling in the information below to create your
                new project.
              </Drawer.Description>
              <label
                htmlFor="name"
                className="font-medium text-gray-900 text-sm mt-8 mb-2 block"
              >
                Project name
              </label>
              <input
                id="name"
                className="border border-gray-200 bg-white w-full px-3 h-9 rounded-lg outline-none focus:ring-2 focus:ring-black/5 text-gray-900"
              />
              <label
                htmlFor="name"
                className="font-medium text-gray-900 text-sm mt-8 mb-2 block"
              >
                Description
              </label>
              <textarea
                rows={6}
                className="border border-gray-200 bg-white w-full resize-none rounded-lg p-3 pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-0"
              />
              <button className="h-[44px] bg-black text-gray-50 rounded-lg mt-4 w-full font-medium">
                Submit
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Drawer.Root repositionInputs={false}>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer with input reposition disabled
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
            <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
              <Drawer.Handle />
              <Drawer.Title className="font-medium text-gray-900 mt-8">
                New Project
              </Drawer.Title>
              <Drawer.Description className="leading-6 mt-2 text-gray-600">
                Get started by filling in the information below to create your
                new project.
              </Drawer.Description>
              <label
                htmlFor="name"
                className="font-medium text-gray-900 text-sm mt-8 mb-2 block"
              >
                Project name
              </label>
              <input
                id="name"
                className="border border-gray-200 bg-white w-full px-3 h-9 rounded-lg outline-none focus:ring-2 focus:ring-black/5 text-gray-900"
              />
              <label
                htmlFor="name"
                className="font-medium text-gray-900 text-sm mt-8 mb-2 block"
              >
                Description
              </label>
              <textarea
                rows={6}
                className="border border-gray-200 bg-white w-full resize-none rounded-lg p-3 pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-0"
              />
              <button className="h-[44px] bg-black text-gray-50 rounded-lg mt-4 w-full font-medium">
                Submit
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Homepage;
