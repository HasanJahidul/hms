import { useRouter } from "next/router";

const update = () => {
  const router = useRouter();
  console.log(router.query.id);
};

export default update;
