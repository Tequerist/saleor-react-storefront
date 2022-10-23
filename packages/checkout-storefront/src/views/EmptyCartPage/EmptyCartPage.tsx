import React from "react";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { Text } from "@saleor/ui-kit";
import { Button, Title } from "@/checkout-storefront/components";
import { emptyCartLabels, emptyCartMessages } from "./messages";

export const EmptyCartPage = () => {
  const formatMessage = useFormattedMessages();

  // eslint-disable-next-line no-restricted-globals
  const goBack = () => history.back();

  return (
    <div className="w-full flex flex-row justify-center lg:mt-10">
      <div className="flex flex-col justify-center w-1/2 items-center section">
        <Title className="emptycarthead">{formatMessage(emptyCartMessages.emptyCart)}</Title>
        <Text>{formatMessage(emptyCartMessages.addToCardToContinue)}</Text>
        <Button
          className="mt-3 emptycartbtn justify-center w-fit !bg-gray !text-white !rounded-2xl px-4"
          ariaLabel={formatMessage(emptyCartLabels.goBackToStore)}
          onClick={goBack}
          variant="secondary"
          label={formatMessage(emptyCartMessages.goBackToStore)}
        />
      </div>
    </div>
  );
};
