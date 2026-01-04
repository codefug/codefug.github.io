import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PATH } from "@/constants/path";

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
