export interface Sections {
  [i: string]: string[];
}
export interface SectionMap {
  sectionName: string;
  articleIndex: number;
}

export interface IAlgoliaList extends Array<IAlgoliaItem>{}
export interface IAlgoliaItem {
  url: string;
  title: string;
  description: string;
  tags: string[];
}
