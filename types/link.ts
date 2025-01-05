export interface Link {
  id: string;
  amount: number;
  expiresAt: Date;
  status: 'active' | 'expired';
}

export interface LinkData {
  senderAddress: string;
  amount: number;
  expiresAt: Date;
}