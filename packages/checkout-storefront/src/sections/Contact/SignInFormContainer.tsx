import React, { PropsWithChildren } from "react";
import { Text } from "@saleor/ui-kit";
import { Button } from "@/checkout-storefront/components/Button";
import { Title } from "@/checkout-storefront/components/Title";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { contactLabels } from "@/checkout-storefront/sections/Contact/messages";

export interface SignInFormContainerProps {
  title: string;
  redirectSubtitle?: string;
  redirectButtonLabel?: string;
  subtitle?: string;
  onSectionChange: () => void;
}

export const SignInFormContainer: React.FC<PropsWithChildren<SignInFormContainerProps>> = ({
  title,
  redirectButtonLabel,
  redirectSubtitle,
  subtitle,
  onSectionChange,
  children,
}) => {
  const formatMessage = useFormattedMessages();

  return (
    <div className="section">
      <div className="flex flex-col mb-2">
        <div className="">
          <Title>{title}</Title>
          <div className="flex flex-row">
            {redirectSubtitle && (
              <Text color="secondary" className="mr-2">
                {redirectSubtitle}
              </Text>
            )}
            {redirectButtonLabel && (
              <Button
                ariaLabel={formatMessage(contactLabels.changeSection)}
                onClick={onSectionChange}
                variant="tertiary"
                label={redirectButtonLabel}
              />
            )}
          </div>
        </div>
        {subtitle && (
          <Text color="secondary" className="mt-3">
            {subtitle}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
};
