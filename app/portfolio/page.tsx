import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArchitectureCases } from "@/components/portfolio/architecture-case";
import { Credentials, Journey } from "@/components/portfolio/journey";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import {
  BeyondCode,
  Closing,
  CurrentWork,
  PortfolioContainer,
  Principles,
} from "@/components/portfolio/portfolio-sections";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  createAlternateLinks,
  createProfilePageStructuredData,
} from "@/components/seo/utils";
import { PATH } from "@/constants/path";
import { defaultLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portfolio.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternateLinks(PATH.PORTFOLIO),
  };
}

export default function Page() {
  return (
    <>
      <StructuredData jsonLd={createProfilePageStructuredData(defaultLocale)} />
      <PortfolioContainer>
        <PortfolioHero />
        <CurrentWork />
        <ArchitectureCases />
        <Principles />
        <BeyondCode />
        <Journey />
        <Credentials />
        <Closing />
      </PortfolioContainer>
    </>
  );
}
