import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";

export default function Donations() {
  useIsLoggedIn();

  return (
    <Layout>
      <div>hello</div>
    </Layout>
  );
}
