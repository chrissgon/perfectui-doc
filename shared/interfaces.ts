export interface ISections {
  [i: string]: string[];
}
export interface ISectionMap {
  sectionName: string;
  articleIndex: number;
}

export interface ISectionLink {
  id: string;
  label: string;
}

export interface ISectionLinks extends Array<ISectionLink> {}

export interface IAlgoliaList extends Array<IAlgoliaItem> {}
export interface IAlgoliaItem {
  url: string;
  title: string;
  description: string;
  tags: string[];
}
