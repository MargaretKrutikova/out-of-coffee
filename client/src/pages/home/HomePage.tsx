import { PageContainer } from "components/layout/PageContainer";
import { Redirect } from "react-router";
import { Routes } from "../../routes/routes";

export const HomePage = () => (
  <PageContainer>
    <Redirect to={Routes.ONGOING_ORDER} />
  </PageContainer>
);
