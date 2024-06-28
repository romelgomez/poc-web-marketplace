import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../core/entity';
import type { IListing } from './listings.types';

export class Listing extends Entity implements IListing {
  id: IListing['id'];
  tag?: IListing['tag'];
  name?: IListing['name'];
  description: IListing['description'];
  visibility: IListing['visibility'];
  account: IListing['account'];
  publications: IListing['publications'];

  constructor(i: IListing) {
    super(i);

    this.id = i?.id || uuidv4();
    this.tag = i.tag;
    this.name = i.name;
    this.description = i.description;
    this.visibility = i.visibility;
    this.account = i.account;
    this.publications = i.publications || [];
  }

  dto() {
    const dto = {
      id: this.id,
      tag: this.tag,
      name: this.name,
      description: this.description,
      visibility: this.visibility,
      accountId: this.account?.id,

      ...this._dto(),
    };

    return this.removeUndefined(dto);
  }
}
