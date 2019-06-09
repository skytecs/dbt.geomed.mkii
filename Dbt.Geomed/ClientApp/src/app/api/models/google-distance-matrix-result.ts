/* tslint:disable */
import { Row } from './row';
export interface GoogleDistanceMatrixResult {
  destination_addresses?: Array<string>;
  origin_addresses?: Array<string>;
  rows?: Array<Row>;
  status?: string;
}
