import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function AdminControls() {
  useIsLoggedIn();

  return (
    <Layout>
      <div>hello</div>
    </Layout>
  );
}
