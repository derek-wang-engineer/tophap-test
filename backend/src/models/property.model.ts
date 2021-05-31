// Interfaces
export interface ISourceProperty {
  id: string
  media: {
    count: number
    photos: string[]
  },
  address: {
    PostalCodeFull: string
    StreetDirPrefix: string
    StreetName: string
    FullAddress: string
    StateOrProvince: string
    CountyOrParish: string
    PostalCode: string
    StreetNumber: string
    City: string
    UnitNumber: string
    UnparsedAddress: string
  }
  topZone: {
    name: string
    id: string
    type: string
  },
  TransactionDate: string
  ListDate: string
  TophapStatusChangeTimestamp: string
  TophapStatus: string
  PrivateSaleFlag: boolean
  TransactionAmount: number
  TransactionAmountPerSqft: number
  ListAmount: number
  ListAmountPerSqft: number
  Price: number
  PricePerSqft: number
  BedsCount: number
  BathsDecimal: number
  LivingSqft: number
  LotAcres: number
  ParkingCount: number
  YearBuilt: number
  RentFlag: boolean
  permitsCount: number
  PropertyUse: string
  estimates?: {
    estimate?: number
    ppsqft?: number
    rentEstimate?: number
    rentPpsqft?: number
    rentYieldEstimate?: number
    date?: string
  },
  StandardStatus: string
  PublicRemarks: string
  Agents: {
    List?: {
      MemberStateLicense?: string
      MemberFullName?: string
      MemberFirstName?: string
      MemberKey?: string
      MemberLastName?: string
      OfficeName?: string
    }
    Buyer?: {
      MemberStateLicense?: string
      MemberFullName?: string
      MemberFirstName?: string
      MemberKey?: string
      MemberLastName?: string
      OfficeName?: string
    }
  }
  PreviousListPriceDiff: number
  displayAddress: string
  displayRegion: string
  location: number[]
  mls: string
  DOM: number
}

export interface IBaseProperty {
  id: string
  address: string
  bedsCount: number
  bathsDecimal: number
  price: number
  pricePerSqft: number
  livingSqft: number
  yearBuilt: number
}
export interface IProperty extends IBaseProperty {
  publicRemarks: string
  photo: string
}

export interface IPropertyFilterRequest {
  bedsCount: number
  bathsDecimal: number
}
export interface IPropertyGetRequest {
  id: string
}
export interface IPropertySearchRequest {
  address: string
}

export class PropertyModel {
  private _id: string;
  get id(): string { return this._id }
  set id(value: string) { this._id = value }

  private _address: string;
  get address(): string { return this._address }
  set address(value: string) { this._address = value }

  private _bedsCount: number;
  get bedsCount(): number { return this._bedsCount }
  set bedsCount(value: number) { this._bedsCount = value }

  private _bathsDecimal: number
  get bathsDecimal(): number { return this._bathsDecimal }
  set bathsDecimal(value: number) { this._bathsDecimal = value }

  private _price: number
  get price(): number { return this._price }
  set price(value: number) { this._price = value }

  private _pricePerSqft: number
  get pricePerSqft(): number { return this._pricePerSqft }
  set pricePerSqft(value: number) { this._pricePerSqft = value }

  private _livingSqft: number
  get livingSqft(): number { return this._livingSqft }
  set livingSqft(value: number) { this._livingSqft = value }

  private _yearBuilt: number
  get yearBuilt(): number { return this._yearBuilt }
  set yearBuilt(value: number) { this._yearBuilt = value }

  private _publicRemarks: string
  get publicRemarks(): string { return this._publicRemarks }
  set publicRemarks(value: string) { this._publicRemarks = value }

  private _photo: string
  get photo(): string { return this._photo }
  set photo(value: string) { this._photo = value }

  constructor(prop: ISourceProperty) {
    this._id = prop.id
    this._address = prop.address.FullAddress
    this._bedsCount = prop.BedsCount
    this._bathsDecimal = prop.BathsDecimal
    this._price = prop.Price
    this._pricePerSqft = prop.PricePerSqft
    this._livingSqft = prop.LivingSqft
    this._yearBuilt = prop.YearBuilt
    this._publicRemarks = prop.PublicRemarks
    this._photo = prop.media.photos.length > 0 ? prop.media.photos[0] : ''
  }

  getBaseEntityMappings = (): IBaseProperty => ({
    id: this.id,
    address: this.address,
    bedsCount: this.bedsCount,
    bathsDecimal: this.bathsDecimal,
    price: this.price,
    pricePerSqft: this.pricePerSqft,
    livingSqft: this.livingSqft,
    yearBuilt: this.yearBuilt
  })

  getFullEntityMappings = (): IProperty => ({
    ...this.getBaseEntityMappings(),
    publicRemarks: this.publicRemarks,
    photo: this.photo
  })
}
