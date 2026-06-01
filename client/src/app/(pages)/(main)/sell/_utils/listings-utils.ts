export type FilterType = 'active' | 'inactive' | 'drafts' | 'completed';

export type FilterItem = {
  name: FilterType;
  count: number;
};
