import {
  BodyContent,
  BodyWrapper,
  DashboardHeader,
  PageContent,
  SideMenu,
} from "..";

export function AppContent({ children, activePath }) {
  return (
    <BodyWrapper>
      <SideMenu activePath={activePath} />
      <PageContent>
        <DashboardHeader />
        <BodyContent>{children}</BodyContent>
      </PageContent>
    </BodyWrapper>
  );
}
