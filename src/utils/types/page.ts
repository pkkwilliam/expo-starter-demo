export interface Page<Type> {
  content: Type[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
}
