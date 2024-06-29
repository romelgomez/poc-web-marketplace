import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../core/entity';
import {
  type IPublication,
  type IPublicationDto,
  PublicationVisibility,
} from './publication.types';

export default class Publication
  extends Entity
  implements Partial<IPublication>
{
  id: string;
  listingId?: IPublication['listingId'];
  title?: IPublication['title'];
  description?: IPublication['description'];
  media?: IPublication['media'];
  visibility: IPublication['visibility'] = PublicationVisibility.PUBLIC;

  constructor(i?: Partial<IPublication | undefined>) {
    super(i);

    this.id = i?.id || uuidv4();
    this.title = i?.title;
    this.description = i?.description;
    this.media = i?.media;
    this.listingId = i?.listingId;
  }

  setPublication(value: Partial<IPublication>) {
    this.listingId = value?.listingId ? value?.listingId : this.listingId;
    this.title = value?.title;
    this.description = value?.description;
  }

  setMedia(value: IPublication['media']) {
    this.media = value;
  }

  getMedia(): IPublication['media'] {
    return this.media || [];
  }

  getErrors = () => {
    const errors: string[] = [];

    if (!this.listingId) {
      errors.push('El listado es requerido');
    }

    if (!this.title) {
      errors.push('El título es requerido');
    }

    if (!this.description) {
      errors.push('La descripción es requerida');
    }

    if (!this.media) {
      errors.push('Las imagenes son requeridas');
    }

    return errors;
  };

  dto(): IPublicationDto {
    let data: IPublicationDto = {
      listingId: this.listingId,
      title: this.title,
      description: this.description,
      visibility: this.visibility,

      ...this._dto(),
    };

    data.media =
      this.media?.map(({ percent, status, uid, ...rest }) => {
        return {
          id: uid,
          ...rest,
        };
      }) || [];

    data = this.removeUndefined(data);

    return data;
  }
}
