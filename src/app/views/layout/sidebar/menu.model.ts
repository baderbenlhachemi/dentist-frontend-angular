export interface MenuItem {
  id?: number;
  label?: string;
  roles?: any[];
  icon?: string;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
}
