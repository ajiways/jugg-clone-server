import { Resource } from '../entities/resource.entity';

export interface GatherStartData {
  resource: Resource;
  login: string;
}
