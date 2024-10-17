interface Court {
  address: string;
  courtStatus: 'ACTIVE' | 'PENDING';
  distance: number;
  name: string;
  numberOfCourt: number;
}
