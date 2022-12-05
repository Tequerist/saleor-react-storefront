import { useIntl } from "react-intl";

import { getProductAttributes } from "@/lib/product";
import { translate } from "@/lib/translations";
import { ProductDetailsFragment, ProductVariantDetailsFragment } from "@/saleor/api";

import { messages } from "../translations";

export interface AttributeDetailsProps {
  product: ProductDetailsFragment;
  selectedVariant?: ProductVariantDetailsFragment;
}

export function AttributeDetails({ product, selectedVariant }: AttributeDetailsProps) {
  const t = useIntl();
  const attributes = getProductAttributes(product, selectedVariant);
  if (attributes.length === 0) {
    return null;
  }
  return (
    <div className="!mb-[50px]">
      <p className="text-[20px] mt-10 mb-4 font-semibold text-black">
        {t.formatMessage(messages.attributes)}
      </p>
      <div>
        {attributes.map((attribute) => (
          <div key={attribute.attribute.id} className="grid grid-cols-2 attribute-item mb-3">
            <div>
              <p className="text-base">{translate(attribute.attribute, "name")}</p>
            </div>
            <div>
              {attribute.values.map((value, index) => {
                if (!value) {
                  return null;
                }
                return (
                  <div key={value.id}>
                    <p className="text-base">
                      {translate(value, "name")}
                      {attribute.values.length !== index + 1 && <div>{" | "}</div>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
