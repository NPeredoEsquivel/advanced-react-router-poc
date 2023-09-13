import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import PageContent from "../../UI/PageContent/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong";

  let errorObject = JSON.parse(error.data);
  if (errorObject.status === 500) {
    message = errorObject.message;
  }

  if (errorObject.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}