import Link from "next/link";
import { PATH } from "@/constants/path";
import { getTranslations } from "@/lib/messages";

export default async function NotFound() {
  const t = await getTranslations("common.notFound");
  return (
    <div>
      <h2>{t("title")}</h2>
      <p>{t("message")}</p>
      <Link href={PATH.HOME}>{t("backToHome")}</Link>
    </div>
  );
}
