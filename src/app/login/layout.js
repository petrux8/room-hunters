import PageWrapper from "@/components/PageWrapper";

export default function AuthLayout({ children }) {
  return <PageWrapper minimalHeader={true}>{children}</PageWrapper>;
}
