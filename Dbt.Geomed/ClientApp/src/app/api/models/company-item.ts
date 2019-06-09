/* tslint:disable */
import { ServiceItem } from './service-item';
import { Location } from './location';
export interface CompanyItem {
  id?: number;
  name?: string;
  address?: string;
  services?: Array<ServiceItem>;
  distance?: number;
  location?: Location;
}
