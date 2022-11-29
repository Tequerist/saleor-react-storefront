import { Divider } from "@/checkout-storefront/components/Divider";
import {
  AddressFragment,
  useCheckoutShippingAddressUpdateMutation,
  useUserQuery,
} from "@/checkout-storefront/graphql";
import { useAlerts } from "@/checkout-storefront/hooks/useAlerts";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { useCheckoutUpdateStateTrigger } from "@/checkout-storefront/hooks/useCheckoutUpdateStateTrigger";
import { useErrors, UseErrors } from "@/checkout-storefront/hooks/useErrors";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { CommonSectionProps } from "@/checkout-storefront/lib/globalTypes";
import { extractMutationErrors, localeToLanguageCode } from "@/checkout-storefront/lib/utils";
import { useAuthState } from "@saleor/sdk";
import React, { useCallback } from "react";
import { GuestAddressSection } from "../GuestAddressSection/GuestAddressSection";
import { AddressFormData, UserAddressFormData } from "../../components/AddressForm/types";
import { UserAddressSection } from "../UserAddressSection/UserAddressSection";
import {
  getAddressInputData,
  getAddressVlidationRulesVariables,
} from "@/checkout-storefront/lib/utils";
import { shippingMessages } from "./messages";
import { useLocale } from "@/checkout-storefront/hooks/useLocale";

export const ShippingAddressSection: React.FC<CommonSectionProps> = ({ collapsed }) => {
  const formatMessage = useFormattedMessages();
  const { locale } = useLocale();
  const { user: authUser } = useAuthState();
  const { checkout } = useCheckout();
  const [{ data }] = useUserQuery({
    pause: !authUser?.id,
  });

  const user = data?.me;
  const addresses = user?.addresses;
  const { showErrors } = useAlerts("checkoutShippingUpdate");
  const errorProps = useErrors<AddressFormData>();
  const { setApiErrors } = errorProps;

  const [{ fetching }, checkoutShippingAddressUpdate] = useCheckoutShippingAddressUpdateMutation();

  useCheckoutUpdateStateTrigger("checkoutShippingUpdate", fetching);

  const updateShippingAddress = useCallback(
    async ({ autoSave, ...address }: AddressFormData) => {
      const result = await checkoutShippingAddressUpdate({
        languageCode: localeToLanguageCode(locale),
        checkoutId: checkout.id,
        shippingAddress: getAddressInputData(address),
        validationRules: getAddressVlidationRulesVariables(autoSave),
      });
      const [hasErrors, errors] = extractMutationErrors(result);
      if (hasErrors) {
        showErrors(errors);
        setApiErrors(errors);
      }
    },
    [checkoutShippingAddressUpdate, locale, checkout.id, showErrors, setApiErrors]
  );

  if (collapsed) {
    return null;
  }

  return (
    <>
      <Divider />
      <div className="section" data-testid="shippingAddressSection">
        {authUser ? (
          <UserAddressSection
            {...(errorProps as UseErrors<UserAddressFormData>)}
            title={formatMessage(shippingMessages.shippingAddress)}
            type="SHIPPING"
            onAddressSelect={(formData: AddressFormData) => {
              void updateShippingAddress(formData);
            }}
            addresses={addresses as AddressFragment[]}
            defaultAddress={user?.defaultShippingAddress}
          />
        ) : (
          <GuestAddressSection
            checkAddressAvailability={true}
            defaultAddress={checkout.shippingAddress}
            title={formatMessage(shippingMessages.shippingAddress)}
            onSubmit={updateShippingAddress}
            {...errorProps}
          />
        )}
      </div>
    </>
  );
};
