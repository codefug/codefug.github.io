import { cva } from "class-variance-authority";

const headerVariant = cva(
  "fixed left-0 right-0 top-0 z-30 transform bg-background transition-transform duration-300",
  {
    variants: {
      isShow: {
        true: "translate-y-0",
        false: "-translate-y-[60px]",
      },
      isShowVerticalScrollbar: {
        true: "",
        false: "shadow-md",
      },
    },
    compoundVariants: [
      {
        isShowVerticalScrollbar: false,
        isShow: false,
        className: "opacity-0",
      },
      {
        isShowVerticalScrollbar: false,
        isShow: true,
        className: "opacity-100",
      },
    ],
    defaultVariants: {
      isShow: true,
      isShowVerticalScrollbar: true,
    },
  },
);

export default headerVariant;
