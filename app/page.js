import { redirect } from "next/navigation";
export default async function Home() {
  return (<h1>Hello world</h1>);
  // redirect("/opportunities");
}
