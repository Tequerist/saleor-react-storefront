import { Classes } from "@/checkout-storefront/lib/globalTypes";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { Text } from "@saleor/ui-kit";

export const Title: React.FC<PropsWithChildren<Classes>> = ({ className, children }) => (
  <Text className={clsx("mb-6 !text-[17px]", className)} weight="bold">
    {children}
  </Text>
);
