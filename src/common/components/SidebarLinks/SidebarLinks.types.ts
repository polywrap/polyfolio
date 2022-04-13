export interface SidebarLink {
  link: string;
  title: string;
  icon: string;
  isExternal?: boolean;
}

export interface INetworksList {
  id: string;
  title: string;
  name: string;
  icon: string;
  checked: boolean;
}
