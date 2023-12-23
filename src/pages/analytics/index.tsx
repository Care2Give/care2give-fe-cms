import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Analytics() {
  useIsLoggedIn();

  return (
    <Layout>
      <div>hello</div>
    </Layout>
  );
}
