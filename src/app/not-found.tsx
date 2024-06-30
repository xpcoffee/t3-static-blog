import { Layout } from "./components/Layout";

export default async function NotFound() {
  return (
    <>
      <head>
        <title>404 Not Found</title>
      </head>
      <Layout>
        <h2>404 Not Found</h2>
        <p>This location does not exist.</p>
      </Layout>
    </>
  );
}
