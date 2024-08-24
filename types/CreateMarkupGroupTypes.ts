export interface FormData {
  groupName: string;
  incomingValue: number | string | null;
  outgoingValue: number | string | null;
  selectedCorporates: string[];
  customMarkups: CustomMarkup[];
}

export interface Asset {
  id: number;
  name: string;
}

export interface CustomMarkup {
  incoming: number;
  outgoing: number;
  asset_id: number | null;
  selectedAsset?: Asset;
}

export interface Errors {
  groupName?: string;
  incomingValue?: string;
  outgoingValue?: string;
}
