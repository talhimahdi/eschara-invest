"use server";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import OpportunitiesList from "./components/OpportunitiesList";
import getOpportunities from "./serverActions/getOpportunities";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import MDBox from "/components/MDBox";

const callGetOpportunities = async () => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role != "admin" && session.user.role != "manager")
  ) {
    redirect("/");
  }

  const opportunities = await getOpportunities();

  // "id": 1,
  // "title": "Queen, 'Really, my dear, I think?' 'I had NOT!' cried the Mouse, frowning, but very glad she had wept when she found it made Alice quite hungry to look through into the book her sister kissed her.",
  // "manager":
  // "status": "Closed",
  // "tags":
  // "commitment": 3472.17,
  // "soft_commitment": 115.18,
  // "terms_conditions": "Id quis quis sit quia fuga. Repudiandae aspernatur voluptate possimus quod ut aut ut soluta.\n\nEum voluptatem aspernatur voluptas eos optio saepe non. Totam in voluptates enim vel vel. Quam dolores omnis ut vero autem tenetur. Voluptate mollitia quia aut debitis atque consectetur quas.\n\nRepudiandae earum quo rerum consequuntur libero libero sed. Quia velit consequatur laboriosam quis possimus. Nemo possimus eius fuga est.",
  // "description": "Culpa ut modi deserunt qui nemo quam id. Fugit ipsa et distinctio autem debitis. Ut tempora quo quo eligendi. Quis asperiores non tenetur voluptatum. Praesentium dolorum ea est quia voluptas quas ea.\n\nVelit illo praesentium assumenda eos tempore. Qui ut ea nostrum at fuga quasi vel consequuntur. Possimus voluptatum voluptatum voluptatem officia accusamus accusantium.\n\nPossimus aut quos beatae deserunt vero voluptatem fugit. Quaerat dolorum accusantium natus officiis. Earum quae quo voluptatum quia. Ut ea tempora minima et nihil nihil deserunt sint.",
  // "analysis": "Ex voluptatem pariatur qui placeat adipisci. Eius laborum voluptatem consequatur accusamus molestiae neque quasi animi. Enim quia numquam voluptatem dolore magni iusto quod. Dolores quasi nihil voluptas vel modi doloremque non.\n\nMinus ut accusantium ea dolorum quia veniam totam mollitia. Aliquid rerum quidem officiis officiis hic. Omnis dolore error quisquam est.\n\nTempore repudiandae velit nam at voluptate. Itaque aut ab minus eum quo ut. Quia aut voluptatem odio repellat libero cum natus.",
  // "financial_parameters": "Provident soluta ipsum itaque dolor dolorum. Sunt ut autem eligendi sequi. Assumenda et aliquid est blanditiis. Et ea molestiae modi quisquam rerum.\n\nLibero repellat et corrupti. Ea culpa nisi alias. Porro ducimus placeat pariatur dolor corrupti.\n\nExpedita officiis iure qui est et deserunt. Minus delectus omnis exercitationem corrupti animi. Qui excepturi quo beatae voluptas ipsum non dignissimos sit.",
  // "google_map": "57.636495,165.464402",
  // "gallery": "[\"https://picsum.photos/500/300?random=1\", \"https://picsum.photos/500/300?random=2\", \"https://picsum.photos/500/300?random=3\", \"https://picsum.photos/500/300?random=4\"]",
  // "created_at": "2023-08-17T23:48:27+00:00"
  return opportunities;
};

export default async function Opportunities() {
  const opportunitiesData = await callGetOpportunities();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox mb={3}>
          <OpportunitiesList opportunities={opportunitiesData} />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
