import { useFormattedMessages } from "@/checkout-storefront/hooks";
import { SaleorLogo } from "@/checkout-storefront/images";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { LanguageSelect } from "@/checkout-storefront/sections/PageHeader/LanguageSelect";
import {
  emptyCartLabels,
  emptyCartMessages,
} from "@/checkout-storefront/views/EmptyCartPage/messages";
import { Button } from "@saleor/ui-kit";

export const PageHeader: React.FC<{ isCartEmpty?: boolean }> = ({ isCartEmpty }) => {
  const formatMessage = useFormattedMessages();

  // eslint-disable-next-line no-restricted-globals
  const goBack = () => history.back();
  return (
    <div className="page-header">
      <div>
        {/* <img src='' alt="logo" className="logo" /> */}
        {!isCartEmpty && (
          <Button
            className="mt-3 emptycartbtn justify-center w-fit !bg-gray !text-white !rounded-2xl px-4"
            // ariaLabel={formatMessage(emptyCartLabels.goBackToStore)}
            onClick={goBack}
            variant="secondary"
            label={formatMessage(emptyCartMessages.goBackToStore)}
          />
        )}
      </div>

      <LanguageSelect />
    </div>
  );
};
