export interface RouteItem {
  path: string;
  isPrivate?: boolean;
  isPublicOnly?: boolean;
  element: React.ReactNode;
}
