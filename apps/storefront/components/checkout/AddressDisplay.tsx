import { AddressDetailsFragment } from "@/saleor/api";

export interface AddressDisplayProps {
  address: AddressDetailsFragment;
}

export function AddressDisplay({ address }: AddressDisplayProps) {
  return (
    <div className="text-base">
      <address className="not-italic mb-4">
        <p className="mb-2">
          {address?.firstName} {address?.lastName}
        </p>
        <p className="mb-2">{address?.streetAddress1}</p>
        <p>
          {address?.postalCode} {address?.city}, {address?.country.country}
        </p>
      </address>
      <div>{address?.phone}</div>
    </div>
  );
}

export default AddressDisplay;
