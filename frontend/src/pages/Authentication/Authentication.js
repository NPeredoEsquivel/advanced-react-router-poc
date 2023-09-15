import { json, redirect } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { setAuthToken } from "../../utils/auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "signup" && mode !== "login") {
    throw json({ messag: "Invalid action" }, { status: 422 });
  }

  const data = await request.formData();
  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let url = "http://localhost:8080/" + mode;

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not login." }, { status: 500 });
  }

  const responseData = await response.json();
  const { token } = responseData;

  setAuthToken(token);

  return redirect("/");
};
