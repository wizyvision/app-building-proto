export interface ListPageProps {
  params: {
    appId: string;
  };
}

export type ListPageType = (props: ListPageProps) => JSX.Element;

export interface ViewPageProps {
  params: {
    appId: string;
    id: string;
  };
}

export type ViewPageType = (props: ViewPageProps) => JSX.Element;

export interface PrintViewProps {
  params: {
    id: string;
    appId: string;
    timezone: string;
    appType: number;
  };
}

export type PrintViewType = (props: PrintViewProps) => JSX.Element;
